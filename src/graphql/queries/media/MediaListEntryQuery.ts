export const MediaListEntryQuery = `query Media($id: Int) {
  Media(id: $id) {
    mediaListEntry {
      status
      score
      progress
    }
  }
}`;