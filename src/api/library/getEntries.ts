import axios from "axios";
import MediaListCollectionQuery from "../../graphql/queries/media/MediaListCollectionQuery";
import { ResponseMediaListCollection } from "../../types";

export const getEntries = async (userId: number, type: string) => {
  const resp = await axios.post<ResponseMediaListCollection>("/", {
    query: MediaListCollectionQuery,
    variables: {
      type,
      userId
    }
  });

  return resp.data.data.MediaListCollection;
}
