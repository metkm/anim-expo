export const SaveMediaListEntry = `mutation(
  $mediaId: Int,
  $score: Float,
  $status: MediaListStatus,
  $progress: Int
) {
  SaveMediaListEntry(
    mediaId: $mediaId,
    score: $score,
    status: $status,
    progress: $progress
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
      mediaListEntry {
        id
        status
        score
        progress
      }
    }
  }
}`;

export default SaveMediaListEntry;