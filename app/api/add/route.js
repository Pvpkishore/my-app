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

export async function POST(request) {
  // Run CORS middleware
  await cors(request, request);

  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("bittree");
  const collection = db.collection("links");

  // If the handle is already claimed, you cannot create the bittree
  const doc = await collection.findOne({ handle: body.handle });

  if (doc) {
    return new Response(
      JSON.stringify({
        success: false,
        error: true,
        message: 'This Bittree already exists!',
        result: null,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const result = await collection.insertOne(body);

  return new Response(
    JSON.stringify({
      success: true,
      error: false,
      message: 'Your Bittree has been generated!',
      result: result,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
