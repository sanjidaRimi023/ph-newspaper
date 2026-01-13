import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB!

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local")
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const client = new MongoClient(uri)

const clientPromise =
  global._mongoClientPromise ?? client.connect()

if (!global._mongoClientPromise) {
  global._mongoClientPromise = clientPromise
}

export async function getDB() {
  const client = await clientPromise
  return client.db(dbName)
}
