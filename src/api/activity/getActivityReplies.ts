import axios from "axios";
import { ActivityReplyObject } from "../objectTypes";

export const getActivityRepliesQuery = `query($id: Int, $page: Int) {
  Page(page: $page, perPage: 25) {
    activityReplies(activityId: $id) {
      id
      text
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
  }
}`;

interface ActivityResponse {
  data: {
    Page: {
      activityReplies: ActivityReplyObject[]
    }
  }
}

export const getActivityReplies = async (id: number, page: number) => {
  const resp = await axios.post<ActivityResponse>("/", {
    query: getActivityRepliesQuery,
    variables: {
      id,
      page
    }
  });

  return resp.data.data.Page.activityReplies
}
