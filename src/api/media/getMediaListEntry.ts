import axios from "axios";
import { MediaListObject } from "../objectTypes";

export const mediaListEntryQuery = `
query Media($id: Int) {
  Media(id: $id) {
    mediaListEntry {
      status
      score
      progress
    }
  }
}`;

export interface MediaListEntryResponse {
  data: {
    Media: {
      mediaListEntry: MediaListObject
    }
  }
}

export const getMediaListEntry = async (id: number) => {
  const resp = await axios.post<MediaListEntryResponse>("/", {
    query: mediaListEntryQuery,
    variables: {
      id
    }
  });

  return resp.data.data.Media.mediaListEntry;
}
