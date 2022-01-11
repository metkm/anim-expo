import axios from "axios";
import { UserObject } from "../objectTypes";

export const userQuery = `
query UserQuery($id: Int) {
  User(id: $id) {
    id
    name
    bannerImage
    options {
      profileColor
    }
    avatar {
      large
    }
    statistics {
      anime {
        count
        minutesWatched
        meanScore
      }
      manga {
        count
        chaptersRead
        meanScore
      }
    }
  }
}`

export interface UserResponse {
  data: {
    User: UserObject;
  };
}

export const getUser = async (userId: number) => {
  const resp = await axios.post<UserResponse>("/", {
    query: userQuery,
    variables: {
      id: userId
    }
  })

  return resp.data.data.User;
}
