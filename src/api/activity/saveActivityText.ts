import axios from "axios";
import { ActivityReplyObject } from "../objectTypes";

export const saveActivityQuery = `
mutation($activityId: Int, $text: String) {
  SaveActivityReply(activityId: $activityId, text: $text) {
    id
    text(asHtml: true)
    createdAt
    isLiked
    likeCount
    user {
      id
      name
      avatar {
        medium
      }
    }
  }
}`;

interface SaveActivityResponse {
  data: {
    SaveActivityReply: ActivityReplyObject
  }
}

export const saveActivity = async (activityId: number, text: string) => {
  const resp = await axios.post<SaveActivityResponse>("/", {
    query: saveActivityQuery,
    variables: {
      activityId,
      text
    }
  });

  return resp.data.data.SaveActivityReply;
}
