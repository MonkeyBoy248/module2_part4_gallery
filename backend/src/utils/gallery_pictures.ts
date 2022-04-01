import * as fs from 'fs';
import {setDateFormat, writeLogs} from "./log_format";
import {isNodeError} from "./error_type_check";
import { paths } from "../config";
import {imageModel} from "../db/models/picture_model";
import {errorLog} from "./error_log";

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

  static async getPicturesFromDB () {
    try {
      const pictures = await imageModel.find();

      return pictures;
    } catch (err) {
      await errorLog(err, `${setDateFormat()} ${this.getPictures.name}`)
    }
  }

  static async getPicturesLength () {
    const pictures = await this.getPicturesFromDB();

    if (pictures) {
      try {
        return pictures.length;
      } catch (err) {
        await errorLog(err, "Failed to get pictures amount")
      }
    }
  }

  static async countTotalPagesAmount (limit: number): Promise<number> {
    const pictures = await this.getPicturesFromDB();
    const picturesPerPage = limit || 4;
    let totalPages: number;

    if (pictures) {
      const picturesTotal = pictures.length;

      totalPages = picturesTotal % picturesPerPage === 0 ?
        Math.floor(picturesTotal / picturesPerPage)
        :
        Math.floor(picturesTotal / picturesPerPage) + 1;

      return totalPages;
    }

    return 0;
  }
}














