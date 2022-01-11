import { useEffect, useState } from "react";
import { getBrowse } from "../api/browse/getBrowse";
import { MediaObject, MediaType } from "../api/objectTypes";

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

export const useBrowse = <Type extends MediaType>(mediaType: Type) => {
  const [browse, setBrowse] = useState<ParameterMap[Type]>();

  useEffect(() => {
    getBrowse<ParameterMap[Type]>(mediaType).then(setBrowse);
  }, [])

  return {
    browse
  }
}
