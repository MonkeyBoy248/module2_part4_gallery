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

  static async getPicturesFromDB (page: number, limit: number) {
    const picturesOnPage: object[] = [];

    try {
      for (let i = (page - 1) * limit; i < page * limit; i++) {
        const picture = await imageModel.findOne({id: `${i}`}) as object;

        if (picture) {
          picturesOnPage.push(picture);
        }
      }

      return picturesOnPage;
    } catch (err) {
      await errorLog(err, `${setDateFormat()} ${this.getPictures.name}`)
    }
  }

  static async getPicturesLength () {
    const picturesLength = await imageModel.count();

    try {
      return picturesLength;
    } catch (err) {
      await errorLog(err, "Failed to get pictures amount")
    }
  }

  static async countTotalPagesAmount (limit: number): Promise<number> {
    const picturesPerPage = limit || 4;
    let totalPages: number;

    const picturesTotal = await this.getPicturesLength() || 0;

    totalPages = picturesTotal % picturesPerPage === 0 ?
      Math.floor(picturesTotal / picturesPerPage)
      :
      Math.floor(picturesTotal / picturesPerPage) + 1;

    return totalPages;
  }
}














