import axios from "axios";
import { MediaObject } from "../objectTypes";

export const mediaQuery = `
query Media($id: Int) {
  Media(id: $id) {
    id
    season
    meanScore
    seasonYear
    format
    status
    episodes
    genres
    status
    description(asHtml: true)
    studios {
      nodes {
        name
      }
    }
    bannerImage
    coverImage {
      large
    }
    title {
      userPreferred
    }
    startDate {
      year
      month
      day
    }
    mediaListEntry {
      id
      status
      score
      progress
    }
    characters {
      edges {
        id
        role
        name
        node {
          id
          image {
            large
          }
          name {
            userPreferred
          }
        }
      }
    }
    relations {
      nodes {
        id
        episodes
        status
        type
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
      }
    }
  }
}`;

export interface MediaResponse {
  data: {
    Media: MediaObject;
  };
}

export const getMedia = async (id: number) => {
  const resp = await axios.post<MediaResponse>("/", {
    query: mediaQuery,
    variables: { id },
  });

  return resp.data.data.Media;
};
