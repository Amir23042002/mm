
import { Handler } from '@netlify/functions';
import crypto from 'crypto';

// Razorpay credentials
const RAZORPAY_KEY_ID = 'rzp_test_rEY8qFgDDd5xsl';
const RAZORPAY_KEY_SECRET = '6C8fba8hMPoxudCwFn3TLmNA';

interface OrderRequest {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  address: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMode: 'PREPAID' | 'COD';
  amount: number;
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
    const orderData: OrderRequest = JSON.parse(event.body || '{}');
    const { items, address, paymentMode, amount } = orderData;

    // Generate order ID
    const orderId = `OYI${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Calculate total (server-side validation)
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const shipping = 50;
    const calculatedTotal = subtotal + gst + shipping;

    // Validate amount
    if (Math.abs(amount - calculatedTotal) > 0.01) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Amount mismatch' 
        }),
      };
    }

    if (paymentMode === 'COD') {
      // For COD, just create the order record
      console.log('COD Order created:', {
        orderId,
        amount: calculatedTotal,
        items,
        address,
        status: 'COD-PENDING'
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orderId,
          paymentMode: 'COD'
        }),
      };
    } else {
      // For prepaid, create Razorpay order
      const razorpayOrder = {
        amount: Math.round(calculatedTotal * 100), // Convert to paise
        currency: 'INR',
        payment_capture: 1,
        notes: {
          orderId,
          customerName: address.name,
          customerPhone: address.phone
        }
      };

      // Create Razorpay order
      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
      
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(razorpayOrder),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Razorpay API Error:', errorData);
        throw new Error('Failed to create Razorpay order');
      }

      const razorpayOrderData = await response.json();

      console.log('Prepaid Order created:', {
        orderId,
        razorpayOrderId: razorpayOrderData.id,
        amount: calculatedTotal,
        status: 'PAYMENT-PENDING'
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orderId,
          razorpayOrderId: razorpayOrderData.id,
          amount: razorpayOrderData.amount,
          keyId: RAZORPAY_KEY_ID
        }),
      };
    }
  } catch (error) {
    console.error('Order creation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to create order' 
      }),
    };
  }
};
