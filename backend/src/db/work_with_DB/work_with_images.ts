import { pictureModel } from "../models/picture_model";
import { Pictures } from "../../utils/gallery_pictures";
import {Picture} from "../../interfaces/picture";

export async function addImagesToDB () {
  const pictureNames = await Pictures.getPictures() || [];
  const pictureMetadata = await Pictures.getFileMetadata();

  for (let i = 0; i < pictureNames.length; i++) {
    if (await pictureModel.exists({id: `${i}`})){
      console.log('Collection is not empty');
      return false;
    }

    await pictureModel.create(
      {
        id: `${i}`,
        path: pictureNames[i],
        metadata: pictureMetadata[i],
      }
    )

    console.log('All pictures added');
  }
}

export async function saveUserImageToDB (pictureObject: Picture) {
  await pictureModel.create(pictureObject);
}

export async function deleteNonexistentPicturesFromDB () {
  const pictureNames =  await Pictures.getPictures();

  if (await pictureModel.exists({"id": {$regex: 'user', $options: 'g'}}) &&
   pictureNames?.filter((item) => {
     item.includes('user')
   }).length === 0) {
    await pictureModel.deleteMany({"id": {$regex: 'user', $options: 'g'}});
  }
}

