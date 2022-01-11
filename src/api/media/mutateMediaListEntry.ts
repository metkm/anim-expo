import axios from "axios";
import { MediaListObject } from "../objectTypes";

export const saveMediaListEntry = `mutation(
  $mediaId: Int,
  $score: Float,
  $status: MediaListStatus,
  $progress: Int
) {
  SaveMediaListEntry(
    mediaId: $mediaId,
    score: $score,
    status: $status,
    progress: $progress
  ) {
    id
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
}`;

export interface MediaListEntryMutationResponse {
  data: {
    SaveMediaListEntry: MediaListObject
  }
}

export const mutateMediaListEntry = async (variables: {}) => {
  const resp = await axios.post<MediaListEntryMutationResponse>("/", {
    query: saveMediaListEntry,
    variables
  });

  return resp.data.data.SaveMediaListEntry.media;
}
