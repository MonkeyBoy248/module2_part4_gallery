import { imageModel } from "../models/picture_model";
import { getFileMetadata } from "../../utils/file_metadata";
import { Pictures } from "../../utils/gallery_pictures";

export async function addImagesToDB () {
  const imageNames = await Pictures.getPictures() || [];
  const imageMetadata = await getFileMetadata();

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

