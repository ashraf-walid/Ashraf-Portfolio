import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; 
const options = {
  // Fix SSL certificate verification issues in development
  tls: true,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === "development",
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  connectTimeoutMS: 10000,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Avoid multiple connections in development
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
