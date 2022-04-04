import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Pictures } from "./gallery_pictures";
import {setDateFormat} from "./log_format";
import { paths } from "../config";
import {errorLog} from "./error_log";
import {addUserImageToDB} from "../db/db_controllers/image_controller";



export async function renameFile (req: Request, res: Response) {
  const pictureData = req.file;
  const picturesLength = await Pictures.getPicturesAmount();

  try {
    if (pictureData) {
      const pictureName = `user_image_${picturesLength + 1}${pictureData.originalname.slice(pictureData.originalname.indexOf('.'))}`

      await fs.promises.rename(
        pictureData.path,
        path.join(paths.API_IMAGES_PATH, pictureName));

      const metadata = await Pictures.getFileMetadata();


      await addUserImageToDB(
        {
          id: `${picturesLength}_user`,
          path: pictureName,
          metadata: metadata[picturesLength]
        }
      );

      res.sendStatus(200);
    }
  } catch (err) {
    await errorLog(err, `${setDateFormat()} ${renameFile.name}`);

    res.sendStatus(500);
  }
}