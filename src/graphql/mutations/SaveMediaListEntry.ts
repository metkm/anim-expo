export const SaveMediaListEntry = `mutation(
  $mediaId: Int,
  $score: Float,
  $status: MediaListStatus
) {
  SaveMediaListEntry(
    mediaId: $mediaId,
    score: $score,
    status: $status
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
    }
  }
}`;

export default SaveMediaListEntry;