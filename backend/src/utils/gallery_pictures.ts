import * as fs from 'fs';
import {setDateFormat, writeLogs} from "./log_format";
import {isNodeError} from "./error_type_check";
import { paths } from "../config";

export class Pictures {
  public static PICTURES_PER_PAGE: number = 4;

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

  static countTotalPagesAmount (pictures: string[]): number {
    const picturesTotal = pictures.length;
    let totalPages: number;
  
    if (picturesTotal % Pictures.PICTURES_PER_PAGE === 0 ) {
      totalPages = Math.floor(picturesTotal / Pictures.PICTURES_PER_PAGE);
    } else {
      totalPages = Math.floor(picturesTotal / Pictures.PICTURES_PER_PAGE) + 1;
    }
  
    return totalPages;
  }
}














