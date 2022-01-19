import axios from "axios";

export const delActivityReplyQuery = `mutation($id: Int) {
  DeleteActivityReply(id: $id) {
    deleted
  }
}`;

interface DelActivityReplyResponse {
  data: {
    DelActivityReply: {
      deleted: boolean
    }
  }
}

export const delActivityReply = async (id: number) => {
  const resp = await axios.post<DelActivityReplyResponse>("/", {
    query: delActivityReplyQuery,
    variables: {
      id
    }
  });

  return resp.data.data.DelActivityReply;
}
