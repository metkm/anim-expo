import axios from "axios";
import { ActivityUnion } from "../objectTypes";

export const activitiesQuery = `
query Page($id: Int, $page: Int) {
  Page(page: $page, perPage: 15) {
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
          id
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
          id
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
          id
          name
          avatar {
            medium
          }
        }
      }
    }
  }
}`;

export interface ActivitiesResponse {
  data: {
    Page: {
      activities: ActivityUnion[];
    };
  };
}

export const getActivities = async (userId: number, page: number) => {
  const resp = await axios.post<ActivitiesResponse>("/", {
    query: activitiesQuery,
    variables: {
      id: userId,
      page: page,
    },
  });

  return resp.data.data.Page.activities;
};
