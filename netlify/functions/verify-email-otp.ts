
import { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const verifyOtpSchema = z.object({
  otpToken: z.string().min(1, 'OTP token is required'),
  code: z.string().length(6, 'OTP must be 6 digits'),
  email: z.string().email('Invalid email address')
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event, context) => {
  console.log('verify-email-otp function called');

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not set');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'JWT secret not configured' }),
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const body = JSON.parse(event.body);
    const { otpToken, code, email } = verifyOtpSchema.parse(body);

    // Verify and decode the OTP token
    let payload: any;
    try {
      payload = jwt.verify(otpToken, process.env.JWT_SECRET);
      console.log('OTP token verified successfully');
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'OTP token expired or invalid' }),
      };
    }

    // Hash the provided code
    const hash = crypto.createHash('sha256').update(code).digest('hex');

    // Verify the OTP hash and email match
    if (payload.hash !== hash || payload.email !== email) {
      console.error('OTP verification failed: hash or email mismatch');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid OTP code' }),
      };
    }

    console.log('OTP verified successfully for email:', email);

    // Hash password for storage
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // Create user object
    const user = {
      id: Date.now().toString(),
      fullName: payload.fullName,
      email: payload.email,
      gender: payload.gender,
      phone: payload.phone,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      verified: true
    };

    // Generate authentication JWT (7 days)
    const authToken = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        phone: user.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Authentication token generated for user:', user.email);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        token: authToken,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          gender: user.gender,
          phone: user.phone
        }
      }),
    };
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    
    if (error.name === 'ZodError') {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Validation error',
          details: error.errors
        }),
      };
    }

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to verify OTP. Please try again.' }),
    };
  }
};
