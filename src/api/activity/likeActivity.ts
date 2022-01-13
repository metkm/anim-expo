import axios from "axios";
import { LikeableType, LikeableUnion } from "../objectTypes";

export const likeActivityQuery = `mutation ($id: Int, $type: LikeableType) {
  ToggleLike: ToggleLikeV2(id: $id, type: $type) {
    ... on ListActivity {
      id
      likeCount
      isLiked
    }
    ... on MessageActivity {
      id
      likeCount
      isLiked
    }
    ... on TextActivity {
      id
      likeCount
      isLiked
    }
    ... on ActivityReply {
      id
      likeCount
      isLiked
    }
    ... on Thread {
      id
      likeCount
      isLiked
    }
    ... on ThreadComment {
      id
      likeCount
      isLiked
    }
  }
}`;

interface LikeActivityResponse {
  data: {
    ToggleLike: LikeableUnion
  }
}

export const likeActivity = async (id: number, type: LikeableType) => {
  const resp = await axios.post<LikeActivityResponse>("/", {
    query: likeActivityQuery,
    variables: {
      id,
      type
    }
  });

  return resp.data.data.ToggleLike;
}
