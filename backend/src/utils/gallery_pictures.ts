import * as fs from 'fs';
import {setDateFormat, writeLogs} from "./log_format";
import {isNodeError} from "./error_type_check";
import { paths } from "../config";

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

  static async getPicturesLength () {
    const pictures = await this.getPictures();

    if (pictures) {
      try {
        return pictures.length;
      } catch (err) {
        const errMessage = err instanceof Error ? err.message : "Pictures amount calculation failed";

        await writeLogs(errMessage);
      }
    }
  }

  static countTotalPagesAmount (pictures: string[], limit: number): number {
    const picturesPerPage = limit || 4;
    const picturesTotal = pictures.length;
    let totalPages: number;
  
    if (picturesTotal % picturesPerPage === 0 ) {
      totalPages = Math.floor(picturesTotal / picturesPerPage);
    } else {
      totalPages = Math.floor(picturesTotal / picturesPerPage) + 1;
    }
  
    return totalPages;
  }
}














