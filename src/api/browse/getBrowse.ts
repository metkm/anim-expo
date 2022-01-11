import axios from "axios";
import { season, nextSeason, seasonYear, nextYear } from "../../timeInfo";

export const mediaFragment = `
fragment media on Media {
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
    score
    status
    progress
  }
}`;

export const animeQuery = `
query ($season: MediaSeason, $nextSeason: MediaSeason, $seasonYear: Int, $nextYear: Int) {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
  season: Page(page: 1, perPage: 6) {
    media(season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
      ...media
    }
  }
  nextSeason: Page(page: 1, perPage: 6) {
    media(season: $nextSeason, seasonYear: $nextYear, type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
      ...media
    }
  }
}
${mediaFragment}
`;

export const mangaQuery = `
query {
  trending: Page(page: 1, perPage: 6) {
    media(sort: TRENDING_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  popular: Page(page: 1, perPage: 6) {
    media(sort: POPULARITY_DESC, type: MANGA, isAdult: false) {
      ...media
    }
  }
  manhwa: Page(page: 1, perPage: 6) {
    media(
      sort: POPULARITY_DESC
      type: MANGA
      countryOfOrigin: "KR"
      isAdult: false
    ) {
      ...media
    }
  }
}
${mediaFragment}
`;

export const getBrowse = async <T>(mediaType: string) => {
  const query = mediaType == "ANIME" ? animeQuery : mangaQuery;

  const resp = await axios.post<{ data: T }>("/", {
    query,
    variables: {
      season,
      nextSeason,
      seasonYear,
      nextYear,
    },
  });

  return resp.data.data;
};
