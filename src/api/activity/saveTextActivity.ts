import axios from "axios";
import { TextActivityObject } from "../objectTypes";

export const saveTextActivityQuery = `
mutation SaveTextActivity($text: String) {
  SaveTextActivity(text: $text) {
    id
    type
    text
    replyCount
    likeCount
    createdAt
    user {
      id
      name
      avatar {
        medium
      }
    }
  }
}`

interface SaveTextActivityResponse {
  data: {
    SaveTextActivity: TextActivityObject
  }
}

export const saveTextActivity = async (text: string) => {
  const resp = await axios.post<SaveTextActivityResponse>("/", {
    query: saveTextActivityQuery,
    variables: {
      text
    }
  });

  return resp.data.data.SaveTextActivity;
}
