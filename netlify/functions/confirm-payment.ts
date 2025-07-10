
import { Handler } from '@netlify/functions';
import crypto from 'crypto';

const RAZORPAY_KEY_SECRET = '6C8fba8hMPoxudCwFn3TLmNA';

interface PaymentConfirmRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const handler: Handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const paymentData: PaymentConfirmRequest = JSON.parse(event.body || '{}');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('Invalid payment signature');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid payment signature' 
        }),
      };
    }

    // Generate final order ID
    const orderId = `OYI${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // In a real app, you would:
    // 1. Update the order status in your database
    // 2. Send confirmation email/SMS
    // 3. Update inventory
    // 4. Trigger fulfillment process

    console.log('Payment confirmed:', {
      orderId,
      razorpayOrderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: 'PAID'
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId,
        paymentId: razorpay_payment_id
      }),
    };
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Payment confirmation failed' 
      }),
    };
  }
};
