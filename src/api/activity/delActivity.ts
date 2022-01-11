import axios from "axios";

export const query = `mutation($id: Int) {
  DeleteActivity(id: $id) {
    deleted
  }
}`

interface Response {
  data: {
    DeleteActivity: {
      deleted: boolean
    }
  }
}

export const delActivity = async (id: number) => {
  const resp = await axios.post<Response>("/", {
    query,
    variables: {
      id
    }
  });

  return resp.data.data.DeleteActivity;
}
