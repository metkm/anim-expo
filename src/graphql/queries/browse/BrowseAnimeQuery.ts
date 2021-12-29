export const BrowseAnimeQuery = `
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
  }
`