import { imageModel } from "../models/picture_model";
import { Pictures } from "../../utils/gallery_pictures";
import {Picture} from "../../interfaces/picture";

export async function addImagesToDB () {
  const imageNames = await Pictures.getPictures() || [];
  const imageMetadata = await Pictures.getFileMetadata();

  for (let i = 0; i < imageNames.length; i++) {
    if (await imageModel.exists({id: `${i}`})){
      console.log('Collection is not empty');
      return false;
    }

    await imageModel.create(
      {
        id: `${i}`,
        path: imageNames[i],
        metadata: imageMetadata[i],
      }
    )

    console.log('All pictures added');
  }
}

export async function addUserImageToDB (imageObject: Picture) {
  await imageModel.create(imageObject);
}

export async function deleteNonexistentPicturesFromDB () {
  const pictureNames =  await Pictures.getPictures();

  if (await imageModel.exists({"id": {$regex: 'user', $options: 'g'}}) &&
   pictureNames?.filter((item) => {
     item.includes('user')
   }).length === 0) {
    await imageModel.deleteMany({"id": {$regex: 'user', $options: 'g'}});
  }
}

