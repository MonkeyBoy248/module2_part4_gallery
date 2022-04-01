import {Pictures} from "../utils/gallery_pictures";


export interface GalleryObject {
  objects: Pictures[];
  page: number;
  total: number;
}