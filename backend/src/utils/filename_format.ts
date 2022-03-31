import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Pictures } from "./gallery_pictures";
import {setDateFormat, writeLogs} from "./log_format";
import {isNodeError} from "./error_type_check";
import { paths } from "../../config";


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
    const errMessage = isNodeError(err) ? err.code : "File rename failed";
    await writeLogs(`${setDateFormat()} ${renameFile.name} ${errMessage}`);

    res.sendStatus(500);
  }
}