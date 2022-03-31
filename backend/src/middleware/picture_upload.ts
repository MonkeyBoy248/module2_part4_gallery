import multer from "multer";
import {paths} from "../../config";

export const upload = multer({dest: paths.API_IMAGES_PATH});

