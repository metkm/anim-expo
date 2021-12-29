import React, { useState, useEffect } from "react";
import axios from "axios";

import { season, nextSeason, seasonYear, nextYear } from "../timeInfo";
import { BrowseAnimeQuery } from "../graphql/queries/browse/BrowseAnimeQuery";
import { BrowseMangaQuery } from "../graphql/queries/browse/BrowseMangaQuery";
import { MediaObject, MediaType } from "../types";

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

type ParameterMap = {
  "ANIME": BrowseAnime,
  "MANGA": BrowseManga,
}

export const getBrowse = async <respType>(query: string, variables: {}) => {
  const resp = await axios.post<respType>("/", {
    query,
    variables
  });

  return resp;
}

export const useBrowse = <Type extends MediaType>(mediaType: Type) => {
  const query = mediaType == "ANIME" ? BrowseAnimeQuery : BrowseMangaQuery;
  const [browse, setBrowse] = useState<ParameterMap[Type]>();

  useEffect(() => {
    getBrowse<{ data: ParameterMap[Type] }>(query, {
      season,
      nextSeason,
      seasonYear,
      nextYear,
    }).then(resp => {
      setBrowse(resp.data.data)
    }).catch(err => {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
    })
  }, [])

  return {
    browse
  }
}
