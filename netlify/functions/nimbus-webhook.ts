import { Handler } from '@netlify/functions';
import { getStore } from '@netlify/kv';

interface WebhookPayload {
  awb_number: string;
  order_number: string;
  current_status: string;
  previous_status: string;
  updated_at: string;
  delivery_date?: string;
  remarks?: string;
  location?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event, context) => {
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
    const webhookData: WebhookPayload = JSON.parse(event.body || '{}');
    
    console.log('Received webhook:', webhookData);

    if (!webhookData.order_number || !webhookData.current_status) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required webhook data' }),
      };
    }

    // Load existing order from KV storage
    const store = getStore('orders');
    const orderNumber = webhookData.order_number;
    let order = null;
    
    try {
      const orderData = await store.get(`order-${orderNumber}`);
      if (orderData) {
        order = JSON.parse(orderData);
      }
    } catch (error) {
      console.error('Failed to read order from KV storage:', error);
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Order not found in storage' }),
      };
    }

    if (!order) {
      console.log(`Order ${orderNumber} not found in KV storage`);
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Order not found' }),
      };
    }

    // Update order status
    order.status = webhookData.current_status;
    order.lastUpdated = new Date().toISOString();
    order.trackingUpdates = order.trackingUpdates || [];
    
    // Add tracking update
    order.trackingUpdates.push({
      status: webhookData.current_status,
      previousStatus: webhookData.previous_status,
      updatedAt: webhookData.updated_at,
      deliveryDate: webhookData.delivery_date,
      remarks: webhookData.remarks,
      location: webhookData.location,
    });

    // Special handling for delivered status
    if (webhookData.current_status.toLowerCase() === 'delivered') {
      order.deliveredAt = webhookData.delivery_date || new Date().toISOString();
      order.canReview = true;
      console.log(`Order ${orderNumber} marked as delivered`);
    }

    // Save updated order to KV storage
    try {
      await store.set(`order-${orderNumber}`, JSON.stringify(order));
      console.log(`Order ${orderNumber} updated successfully in KV storage`);
    } catch (error) {
      console.error('Failed to save updated order to KV storage:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to update order in storage' }),
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Order status updated successfully',
        order_number: orderNumber,
        new_status: webhookData.current_status
      }),
    };

  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to process webhook',
        details: error.message 
      }),
    };
  }
};