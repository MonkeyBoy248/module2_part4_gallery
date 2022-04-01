import mongoose from "mongoose";
import {Picture} from "../../interfaces/picture";

const { Schema } = mongoose;

const imageSchema = new Schema<Picture>(
  {
    id: Number,
    path: String,
    metadata: Object
  }
)

export const imageModel = mongoose.model('Image', imageSchema);