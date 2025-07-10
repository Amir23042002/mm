import { Handler } from '@netlify/functions';
import { promises as fs } from 'fs';
import path from 'path';

interface ReviewRequest {
  orderId: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  customerName?: string;
  productName?: string;
}

interface Review {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  customerName?: string;
  productName?: string;
  createdAt: string;
  verified: boolean;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
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
    const reviewData: ReviewRequest = JSON.parse(event.body || '{}');
    
    // Validate required fields
    if (!reviewData.orderId || !reviewData.rating || !reviewData.comment) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required fields: orderId, rating, comment' }),
      };
    }

    // Validate rating range
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Rating must be between 1 and 5' }),
      };
    }

    // Check if order exists and is delivered
    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    let orders = {};
    
    try {
      const ordersData = await fs.readFile(ordersPath, 'utf8');
      orders = JSON.parse(ordersData);
    } catch (error) {
      console.error('Failed to read orders file:', error);
    }

    const order = orders[reviewData.orderId];
    if (!order) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Order not found' }),
      };
    }

    // Check if order is delivered (can review)
    if (!order.canReview && order.status?.toLowerCase() !== 'delivered') {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Can only review delivered orders' }),
      };
    }

    // Generate unique review ID
    const reviewId = `REV${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create review object
    const review: Review = {
      id: reviewId,
      orderId: reviewData.orderId,
      rating: reviewData.rating,
      comment: reviewData.comment.trim(),
      imageUrl: reviewData.imageUrl || undefined,
      customerName: reviewData.customerName || order.customerName || 'Anonymous',
      productName: reviewData.productName || (order.items && order.items[0]?.name) || 'Product',
      createdAt: new Date().toISOString(),
      verified: true // Since it's linked to a real order
    };

    // Load existing reviews
    const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');
    let reviews = [];
    
    try {
      const reviewsData = await fs.readFile(reviewsPath, 'utf8');
      reviews = JSON.parse(reviewsData);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      reviews = [];
    }

    // Check if review already exists for this order
    const existingReview = reviews.find(r => r.orderId === reviewData.orderId);
    if (existingReview) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Review already exists for this order' }),
      };
    }

    // Add new review
    reviews.push(review);

    // Save reviews
    await fs.writeFile(reviewsPath, JSON.stringify(reviews, null, 2));

    // Update order to mark as reviewed
    if (orders[reviewData.orderId]) {
      orders[reviewData.orderId].hasReview = true;
      orders[reviewData.orderId].reviewId = reviewId;
      await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        review_id: reviewId,
        message: 'Review submitted successfully',
        review: review
      }),
    };

  } catch (error) {
    console.error('Review submission error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to submit review',
        details: error.message 
      }),
    };
  }
};