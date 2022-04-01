import {authorizedUsers} from "../../authorized_users_list";
import {userModel} from "../models/user_model";

export async function addUsersToDB () {
  const authorizedUserProperties = Object.entries(authorizedUsers);

  for (let [email, password] of authorizedUserProperties) {
    if (!await userModel.exists({email: email})) {
      console.log('Collection is not empty');
      return false;
    }

    await userModel.create(
      {
        email,
        password
      }
    )

    console.log("All users added");
  }
}

