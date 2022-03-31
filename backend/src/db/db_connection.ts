import mongoose from "mongoose";
import dotenv from "dotenv";
import { userModel } from "./models/user_model";
import { imageModel } from "./models/picture_model";

dotenv.config();

export async function connectDB () {
  const mongoUrl = process.env.MONGO_URL || '';

  try {
    const dbConnection = await mongoose.connect(mongoUrl);

    console.log(`DB connected: ${dbConnection.connection.host}`)
  } catch (err) {
    console.log(err);
  }
}
