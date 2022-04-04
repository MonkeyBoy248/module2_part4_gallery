import mongoose from "mongoose";
import dotenv from "dotenv";
import {errorLog} from "../utils/error_log";

dotenv.config();

export async function connectDB () {
  const mongoUrl = process.env.MONGO_URL || '';

  try {
    const dbConnection = await mongoose.connect(mongoUrl);

    console.log(`DB connected: ${dbConnection.connection.host}`)
  } catch (err) {
    await errorLog(err, `DB connection failed`)
  }
}
