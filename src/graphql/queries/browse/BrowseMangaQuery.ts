export const BrowseMangaQuery = `
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