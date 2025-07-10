import { Handler } from '@netlify/functions';
import { getStore } from '@netlify/kv';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const orderId = event.queryStringParameters?.orderId;
    
    if (!orderId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing orderId parameter' }),
      };
    }

    // Load order from KV storage
    let order = null;
    try {
      const store = getStore('orders');
      const orderData = await store.get(`order-${orderId}`);
      if (orderData) {
        order = JSON.parse(orderData);
      }
    } catch (error) {
      console.error('Failed to read order from KV storage:', error);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to load order' }),
      };
    }

    if (!order) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Order not found' }),
      };
    }

    // Prepare response with order details
    const orderStatus = {
      orderId: order.orderId,
      status: order.status,
      customerName: order.customerName,
      phone: order.phone,
      address: {
        street: order.address,
        city: order.city,
        state: order.state,
        pincode: order.pincode
      },
      items: order.items,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      lastUpdated: order.lastUpdated,
      trackingId: order.trackingId,
      trackingUpdates: order.trackingUpdates || [],
      deliveredAt: order.deliveredAt,
      canReview: order.canReview || false,
      hasReview: order.hasReview || false,
      reviewId: order.reviewId
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        order: orderStatus
      }),
    };

  } catch (error) {
    console.error('Get order status error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to get order status',
        details: error.message 
      }),
    };
  }
};