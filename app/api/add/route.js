// pages/api/add.js
import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware'; // Path to init-middleware.js
import clientPromise from "@/lib/mongodb";

// Initialize CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    origin: 'https://linktrekishore-decgakct1-pv-kishores-projects.vercel.app', // Allow your frontend domain
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

export async function handler(req, res) {
  // Run CORS middleware
  await cors(req, res);

  if (req.method === 'POST') {
    const body = req.body;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    // Check if the handle already exists
    const doc = await collection.findOne({ handle: body.handle });

    if (doc) {
      // Return error response if handle exists
      return res.status(400).json({
        success: false,
        error: true,
        message: 'This Bittree already exists!',
        result: null,
      });
    }

    // Insert new document if handle does not exist
    const result = await collection.insertOne(body);

    // Return success response
    return res.status(200).json({
      success: true,
      error: false,
      message: 'Your Bittree has been generated!',
      result: result,
    });
  } else {
    // If the method is not POST, return 405 Method Not Allowed
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }
}
