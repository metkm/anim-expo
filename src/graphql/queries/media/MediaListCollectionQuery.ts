export const MediaListCollectionQuery = `query MediaListCollection($userId: Int, $type: MediaType) {
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
        }
      }
      name
    }
  }
}`;

export default MediaListCollectionQuery;
