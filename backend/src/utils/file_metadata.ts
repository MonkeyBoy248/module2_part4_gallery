import { paths } from "../config";
import fs, {Stats} from "fs";
import path from "path";
import {Pictures} from "./gallery_pictures";

export async function getFileMetadata () {
  const { API_IMAGES_PATH } = paths;
  const imageNames = await Pictures.getPictures();
  const metadataArray: Stats[] = [];

  if (imageNames) {
    for (let name of imageNames) {
      metadataArray.push(await fs.promises.stat(path.join(API_IMAGES_PATH, name)));
    }
  }

  return metadataArray;
}