// lib/mongodb.js

// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI

// const options = { 
//   useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') { 
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Add Mongo URI to .env.local');
}

let mongooseConnectionPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the connection across module reloads
  if (!global._mongooseConnectionPromise) {
    global._mongooseConnectionPromise = mongoose.connect(uri, {
      useUnifiedTopology: true, // Ensures stable connection handling
    });
  }
  mongooseConnectionPromise = global._mongooseConnectionPromise;
} else {
  // In production, create a new connection instance
  mongooseConnectionPromise = mongoose.connect(uri, {
    useUnifiedTopology: true,
  });
}

export default mongooseConnectionPromise;


export default clientPromise

