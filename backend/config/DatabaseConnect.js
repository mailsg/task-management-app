require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoURI = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;
const collname = process.env.COLLECTION_NAME;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
    ServerApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Function to connect to the MongoDB database
async function ConnectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connection to MongoDB', error);
        throw error;
    }
}

// Function to close MongoDB connection
async function CloseDatabaseConnection() {
    try {
        await client.close();
        console.log('Disconnected MongoDB connection');
    } catch (error) {
        console.error('Error closing MongoDB connection', error);
        throw error;
    }
}

module.exports = {
    ConnectToDatabase,
    CloseDatabaseConnection,
    GetTaskCollection: () => client.db(dbName).collection(collname),
}