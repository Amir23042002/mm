
import { Handler } from '@netlify/functions';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FROM_NAME,
  FROM_EMAIL,
  JWT_SECRET,
} = process.env;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event) => {
  // 🔎 Debug – see if env vars are loaded
  console.log(
    'DEBUG SMTP:',
    SMTP_USER || 'undefined',
    SMTP_PASS ? '✔️' : '❌'
  );

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, name = 'User', fullName, gender, phone, password } = JSON.parse(event.body || '{}');
    if (!email) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Email required' }),
      };
    }

    // 6‑digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiry = new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString();

    // Nodemailer transport (Brevo SMTP)
    const transporter = nodemailer.createTransporter({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: 'Your OYIEE OTP Code',
      html: `
        <div style="background:#000;color:gold;padding:20px;
                    font-family:Arial;text-align:center;">
          <h1>OYIEE</h1>
          <h2 style="font-size:36px;margin:20px 0;">${otp}</h2>
          <p>Hello ${fullName || name},</p>
          <p>Your verification code is valid for 15 minutes.</p>
          <p>Expires at: ${expiry}</p>
        </div>
      `,
    });

    const otpToken = jwt.sign(
      {
        email,
        hash,
        fullName,
        gender,
        phone,
        password,
        exp: Math.floor(Date.now() / 1000) + 15 * 60
      },
      JWT_SECRET!
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, otpToken }),
    };
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to send OTP. Please try again.' }),
    };
  }
};
