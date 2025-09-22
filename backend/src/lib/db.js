import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB CONNECTED: " + conn.connection.host);
    } catch (error) {
        console.error("MONGO DB CONNECTION ERROR: " + error);
        process.exit(1); // Exit process with failure
    }
}