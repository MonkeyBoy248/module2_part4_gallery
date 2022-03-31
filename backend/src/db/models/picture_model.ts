import mongoose from "mongoose";
import {Image} from "../../interfaces/image";
import {Stats} from "fs";

const { Schema } = mongoose;

const imageSchema = new Schema<Image>(
  {
    id: Number,
    path: String,
    metadata: Stats
  }
)

export const imageModel = mongoose.model('Image', imageSchema);