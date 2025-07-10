import { Handler } from '@netlify/functions';
import { createUploadthing, type FileRouter } from "uploadthing/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Create the UploadThing instance
const f = createUploadthing({
  secret: process.env.UPLOADTHING_SECRET,
});

// Define the file router
const ourFileRouter = {
  reviewImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // You can add authentication here if needed
      return { userId: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

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
    // This is a simplified version - in a real implementation,
    // you would integrate with UploadThing's API directly
    
    const body = JSON.parse(event.body || '{}');
    
    if (!body.fileData) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'No file data provided' }),
      };
    }

    // For now, return a mock response
    // In production, you would call UploadThing API here
    const mockUploadResponse = {
      success: true,
      fileUrl: `https://uploadthing.com/f/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`,
      fileKey: `review-${Date.now()}`,
      fileName: body.fileName || 'review-image.jpg'
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(mockUploadResponse),
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to upload image',
        details: error.message 
      }),
    };
  }
};