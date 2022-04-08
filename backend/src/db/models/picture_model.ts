import mongoose from "mongoose";
import {Picture} from "../../interfaces/picture";

const { Schema } = mongoose;

const pictureSchema = new Schema<Picture>(
  {
    id: String,
    path: String,
    metadata: Object
  }
)

export const pictureModel = mongoose.model('Image', pictureSchema);