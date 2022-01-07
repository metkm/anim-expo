import axios from "axios";
import { MediaListEntryQuery } from "../../graphql/queries/media/MediaListEntryQuery";
import { ResponseMediaListEntry } from "../../types";

export const getMediaListEntry = async (id: number) => {
  const resp = await axios.post<ResponseMediaListEntry>("/", {
    query: MediaListEntryQuery,
    variables: {
      id
    }
  });

  return resp.data.data.Media.mediaListEntry;
}
