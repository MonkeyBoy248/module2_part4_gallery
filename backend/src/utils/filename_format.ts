import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Pictures } from "./gallery_pictures";
import {setDateFormat} from "./log_format";
import { paths } from "../config";
import {errorLog} from "./error_log";
import {saveUserImageToDB} from "../db/work_with_DB/work_with_images";



export async function renameFileAndSaveToDB (req: Request, res: Response) {
  const pictureData = req.file;
  const picturesLength = await Pictures.getPicturesAmount();

  try {
    if (pictureData) {
      const pictureName = `user_image_${picturesLength + 1}${pictureData.originalname.slice(pictureData.originalname.indexOf('.'))}`

      await fs.promises.rename(
        pictureData.path,
        path.join(paths.API_IMAGES_PATH, pictureName));

      const metadata = await Pictures.getFileMetadata();


      await saveUserImageToDB(
        {
          id: `${picturesLength}_user`,
          path: pictureName,
          metadata: metadata[picturesLength]
        }
      );

      res.sendStatus(200);
    }
  } catch (err) {
    await errorLog(err, `${setDateFormat()} ${renameFileAndSaveToDB.name}`);

    res.sendStatus(500);
  }
}