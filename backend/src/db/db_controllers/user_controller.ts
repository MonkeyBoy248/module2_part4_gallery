import {authorizedUsers} from "../../authorized_users_list";
import {userModel} from "../models/user_model";

export async function createAuthorizedUsers () {
  const authorizedUserProperties = Object.entries(authorizedUsers);

  for (let [email, password] of authorizedUserProperties) {
    if (Object.keys(await userModel.find({email: email})).length !== 0) {
      console.log('Collection is not empty');
      return false;
    }

    const user = await userModel.create(
      {
        email,
        password
      }
    )

    console.log(user);
  }
}

