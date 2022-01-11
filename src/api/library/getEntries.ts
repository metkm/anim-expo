import axios from "axios";
import { MediaListCollectionObject } from "../objectTypes";

export const mediaListCollectionQuery = `
query MediaListCollection($userId: Int, $type: MediaType) {
  MediaListCollection(userId: $userId, type: $type) {
    lists {
      entries {
        progress
        media {
          id
          episodes
          status
          title {
            userPreferred
          }
          coverImage {
            extraLarge
          }
          nextAiringEpisode {
            timeUntilAiring
            episode
          }
          mediaListEntry {
            id
            status
            score
            progress
          }
        }
      }
      name
    }
  }
}`;

export interface MediaListCollectionResponse {
  data: {
    MediaListCollection: MediaListCollectionObject;
  };
}

export const getEntries = async (userId: number, type: string) => {
  const resp = await axios.post<MediaListCollectionResponse>("/", {
    query: mediaListCollectionQuery,
    variables: {
      type,
      userId
    }
  });

  return resp.data.data.MediaListCollection;
}
