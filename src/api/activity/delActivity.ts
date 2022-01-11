import axios from "axios";

export const delActivityQuery = `mutation($id: Int) {
  DeleteActivity(id: $id) {
    deleted
  }
}`

interface DelActivityResponse {
  data: {
    DeleteActivity: {
      deleted: boolean
    }
  }
}

export const delActivity = async (id: number) => {
  const resp = await axios.post<DelActivityResponse>("/", {
    query: delActivityQuery,
    variables: {
      id
    }
  });

  return resp.data.data.DeleteActivity;
}
