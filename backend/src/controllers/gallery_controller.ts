import * as express from 'express';
import { Request, Response } from "express";
import { Controller } from "../interfaces/controller";
import { GalleryObject } from "../interfaces/gallery_object";
import { Pictures } from "../utils/gallery_pictures";
import { checkAuthorizationHeader } from "../middleware/authentication";
import { upload } from "../middleware/picture_upload";
import { renameFile } from "../utils/filename_format";

export class GalleryController implements Controller {
  public path = '/gallery';
  public router = express.Router();

  constructor() {
    this.setRoute();
  }

  setRoute () {
    return this.router.route(this.path)
      .get(checkAuthorizationHeader, this.sendGalleryResponse)
      .post(checkAuthorizationHeader, upload.single('file'), this.uploadUserPicture);
  }

  private sortFileNames = (objects: string[]) => {
    const pattern = /\d+/g;

    return objects.sort((first, second) => {
      return Number(first.match(pattern)) - Number(second.match(pattern))
    })
  }

  private createGalleryResponseObject = async (total: number, page: string, limit: number ): Promise<GalleryObject> => {
    const objects = await Pictures.getPicturesFromDB() || [] as Pictures[];
    const pageNumber = Number(page);
    const picturesPerPage = limit || 4;
    const objectsTraversePattern = objects.slice((pageNumber - 1) * picturesPerPage, pageNumber * picturesPerPage);
    const response: GalleryObject = {
      objects: objectsTraversePattern,
      total,
      page: pageNumber
    }

    return response;
  }

  private sendGalleryResponse = async (req: Request, res: Response) => {
    const totalPagesAmount = await Pictures.countTotalPagesAmount(Number(req.query.limit))
    const pageNumber = req.query.page ? String(req.query.page) : '1';
    const responseObject = await this.createGalleryResponseObject(totalPagesAmount, pageNumber, Number(req.query.limit));

    if (Number(pageNumber) <= 0 || Number(pageNumber) > totalPagesAmount) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(responseObject);
  }

  private uploadUserPicture = async (req: Request, res: Response) => {
    await renameFile(req, res);
  }
}