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

  private createGalleryResponseObject = (objects: string[], total: number, page: string ): GalleryObject => {
    const pageNumber = Number(page);
    const sortedObjects = this.sortFileNames(objects);
    const objectsTraversePattern = sortedObjects.slice((pageNumber - 1) * Pictures.PICTURES_PER_PAGE, pageNumber * Pictures.PICTURES_PER_PAGE);
    const response: GalleryObject = {
      objects: objectsTraversePattern,
      total,
      page: pageNumber
    }

    return response;
  }

  private sendGalleryResponse = async (req: Request, res: Response) => {
    const pictureNames = await Pictures.getPictures();
    const totalPagesAmount = Pictures.countTotalPagesAmount(pictureNames!)
    const pageNumber = req.query.page ? String(req.query.page) : '1';
    const responseObject = this.createGalleryResponseObject(pictureNames!, totalPagesAmount, pageNumber);

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