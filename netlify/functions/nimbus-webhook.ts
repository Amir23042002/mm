import { Handler } from '@netlify/functions';
import { promises as fs } from 'fs';
import path from 'path';

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

    // Load existing orders
    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    let orders = {};
    
    try {
      const ordersData = await fs.readFile(ordersPath, 'utf8');
      orders = JSON.parse(ordersData);
    } catch (error) {
      console.error('Failed to read orders file:', error);
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Orders file not found' }),
      };
    }

    // Find and update the order
    const orderNumber = webhookData.order_number;
    if (!orders[orderNumber]) {
      console.log(`Order ${orderNumber} not found in local storage`);
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Order not found' }),
      };
    }

    // Update order status
    orders[orderNumber].status = webhookData.current_status;
    orders[orderNumber].lastUpdated = new Date().toISOString();
    orders[orderNumber].trackingUpdates = orders[orderNumber].trackingUpdates || [];
    
    // Add tracking update
    orders[orderNumber].trackingUpdates.push({
      status: webhookData.current_status,
      previousStatus: webhookData.previous_status,
      updatedAt: webhookData.updated_at,
      deliveryDate: webhookData.delivery_date,
      remarks: webhookData.remarks,
      location: webhookData.location,
    });

    // Special handling for delivered status
    if (webhookData.current_status.toLowerCase() === 'delivered') {
      orders[orderNumber].deliveredAt = webhookData.delivery_date || new Date().toISOString();
      orders[orderNumber].canReview = true;
      console.log(`Order ${orderNumber} marked as delivered`);
    }

    // Save updated orders
    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

    console.log(`Order ${orderNumber} updated successfully`);

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