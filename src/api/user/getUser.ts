import axios from "axios";
import UserQuery from "../../graphql/queries/UserQuery";
import { ResponseUser, UserObject } from "../../types";

export const getUser = async (userId: number): Promise<UserObject> => {
  const resp = await axios.post<ResponseUser>("/", {
    query: UserQuery,
    variables: {
      id: userId
    }
  })

  return resp.data.data.User;
}
