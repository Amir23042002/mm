import { Handler } from '@netlify/functions';
import { promises as fs } from 'fs';
import path from 'path';

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
    const { productName, rating, limit = '10', offset = '0' } = event.queryStringParameters || {};
    
    // Load reviews
    const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');
    let reviews = [];
    
    try {
      const reviewsData = await fs.readFile(reviewsPath, 'utf8');
      reviews = JSON.parse(reviewsData);
    } catch (error) {
      console.error('Failed to read reviews file:', error);
      reviews = [];
    }

    // Filter reviews based on query parameters
    let filteredReviews = reviews;

    if (productName) {
      filteredReviews = filteredReviews.filter(review => 
        review.productName?.toLowerCase().includes(productName.toLowerCase())
      );
    }

    if (rating) {
      const ratingNum = parseInt(rating);
      if (ratingNum >= 1 && ratingNum <= 5) {
        filteredReviews = filteredReviews.filter(review => review.rating === ratingNum);
      }
    }

    // Sort by creation date (newest first)
    filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    const paginatedReviews = filteredReviews.slice(offsetNum, offsetNum + limitNum);

    // Calculate statistics
    const totalReviews = filteredReviews.length;
    const averageRating = totalReviews > 0 
      ? filteredReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    const ratingDistribution = {
      5: filteredReviews.filter(r => r.rating === 5).length,
      4: filteredReviews.filter(r => r.rating === 4).length,
      3: filteredReviews.filter(r => r.rating === 3).length,
      2: filteredReviews.filter(r => r.rating === 2).length,
      1: filteredReviews.filter(r => r.rating === 1).length,
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        reviews: paginatedReviews,
        pagination: {
          total: totalReviews,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < totalReviews
        },
        statistics: {
          totalReviews,
          averageRating: Math.round(averageRating * 10) / 10,
          ratingDistribution
        }
      }),
    };

  } catch (error) {
    console.error('Get reviews error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to get reviews',
        details: error.message 
      }),
    };
  }
};