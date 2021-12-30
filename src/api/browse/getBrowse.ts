import axios from "axios";
import { BrowseAnimeQuery } from "../../graphql/queries/browse/BrowseAnimeQuery";
import { BrowseMangaQuery } from "../../graphql/queries/browse/BrowseMangaQuery";

import { season, nextSeason, seasonYear, nextYear } from "../../timeInfo";
import { MediaType, MediaObject } from "../../types";

interface BrowseAnime {
  trending: {
    media: MediaObject[]
  },
  season: {
    media: MediaObject[]
  },
  nextSeason: {
    media: MediaObject[]
  },
  popular: {
    media: MediaObject[]
  }
}

interface BrowseManga {
  trending: {
    media: MediaObject[]
  },
  popular: {
    media: MediaObject[]
  },
  manhwa: {
    media: MediaObject[]
  }
}

type BrowseResponses = {
  "ANIME": BrowseAnime
  "MANGA": BrowseManga
}

export const getBrowse = async <T extends MediaType>(mediaType: T) => {
  const query = mediaType == "ANIME" ? BrowseAnimeQuery : BrowseMangaQuery;

  const resp = await axios.post<{ data: BrowseResponses[T] }>("/", {
    query,
    variables: {
      season,
      nextSeason,
      seasonYear,
      nextYear
    }
  });

  return resp.data.data;
}
