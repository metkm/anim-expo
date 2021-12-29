export const activitiesQuery = `query Page($id: Int, $page: Int) {
  Page(page: $page, perPage: 20) {
    activities(userId: $id, sort: ID_DESC) {
      ... on ListActivity {
        id
        type
        status
        progress
        createdAt
        replyCount
        likeCount
        media {
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
      }

      ... on TextActivity {
        id
        type
        text(asHtml: true)
        replyCount
        likeCount
        createdAt
        user {
          name
          avatar {
            medium
          }
        }
      }

      ... on MessageActivity {
        id
        type
        replyCount
        likeCount
        message(asHtml: true)
        createdAt
        messenger {
          name
          avatar {
            medium
          }
        }
      }
    }
  }
}`;

export default activitiesQuery;
