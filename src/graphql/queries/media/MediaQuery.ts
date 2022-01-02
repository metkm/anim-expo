export const MediaQuery = `
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
