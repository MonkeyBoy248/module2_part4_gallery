import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Pictures } from "./gallery_pictures";
import {setDateFormat} from "./log_format";
import { paths } from "../config";
import {errorLog} from "./error_log";


export async function renameFile (req: Request, res: Response) {
  const pictureData = req.file;
  const picturesLength = await Pictures.getPicturesLength();

  try {
    if (pictureData) {
      const pictureName = `image_${picturesLength}${pictureData.originalname.slice(pictureData.originalname.indexOf('.'))}`

      await fs.promises.rename(
        pictureData.path,
        path.join(paths.API_IMAGES_PATH, pictureName));

      res.sendStatus(200);
    }
  } catch (err) {
    await errorLog(err, `${setDateFormat()} ${renameFile.name}`);

    res.sendStatus(500);
  }
}