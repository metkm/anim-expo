import axios from "axios";
import { MessageActivityObject } from "../objectTypes";

export const saveMessageActivityQuery = `
mutation($recipientId: Int, $message: String, $priv: Boolean) {
  SaveMessageActivity(recipientId: $recipientId, message: $message, private: $priv) {
    id
    type
    message
    replyCount
    likeCount
    createdAt
    messenger {
      id
      name
      avatar {
        medium
      }
    }
  }
}`;

interface SaveMessageActivityResponse {
  data: {
    SaveMessageActivity: MessageActivityObject
  }
}

export const saveMessageActivity = async (recipientId: number, message: string, priv: boolean) => {
  const resp = await axios.post<SaveMessageActivityResponse>("/", {
    query: saveMessageActivityQuery,
    variables: {
      recipientId,
      message,
      priv,
    }
  });

  return resp.data.data.SaveMessageActivity;
}
