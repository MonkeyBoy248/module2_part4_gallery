import mongoose from "mongoose";
import {User} from "../../interfaces/user";

const { Schema } = mongoose;

const userSchema = new Schema<User>(
  {
    email: String,
    password: String,
  }
)

export const userModel = mongoose.model('User', userSchema);