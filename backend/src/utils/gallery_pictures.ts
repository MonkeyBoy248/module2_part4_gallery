import * as fs from 'fs';
import {setDateFormat, writeLogs} from "./log_format";
import {isNodeError} from "./error_type_check";
import { paths } from "../config";
import {pictureModel} from "../db/models/picture_model";
import {errorLog} from "./error_log";
import {Stats} from "fs";
import path from "path";

export class Pictures {
  static async getPictures () {
    try {
      const fileNames = await fs.promises.readdir(paths.API_IMAGES_PATH);
      return fileNames;
    } catch (err) {
      const errMessage = isNodeError(err) ? err.code : "File reading error";

      await writeLogs(`${setDateFormat()} ${this.getPictures.name} ${errMessage}`);
    }
  }

  static async getPicturesAmount () {
    return pictureModel.estimatedDocumentCount();
  }

  static async getPicturesFromDB (page: number, limit: number) {
    try {
      const pictures = await pictureModel.find({}, null, {skip: limit * page - limit, limit: limit});

      return pictures;
    } catch (err) {
      await errorLog(err, `${setDateFormat()} ${this.getPictures.name}`)
    }
  }

  static async countTotalPagesAmount (limit: number): Promise<number> {
    const picturesPerPage = limit || 4;
    let totalPages: number;

    const picturesTotal = await this.getPicturesAmount() || 0;

    totalPages = picturesTotal % picturesPerPage === 0 ?
      Math.floor(picturesTotal / picturesPerPage)
      :
      Math.floor(picturesTotal / picturesPerPage) + 1;

    return totalPages;
  }

  static getFileMetadata = async () => {
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
}














