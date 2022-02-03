import axios from "axios";
import { NotificationUnion } from "../objectTypes";

export const notificationsQuery = `
query Page($page: Int, $types: [NotificationType]) {
  Page(page: $page, perPage: 15) {
    notifications(type_in: $types, resetNotificationCount: true) {
      ... on AiringNotification {
        id
        episode
        contexts
        type
        media {
          id
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
        createdAt
      }

      ... on ActivityLikeNotification {
        id
        type
        context
        user {
          name
          avatar {
            large
          }
        }
        createdAt
      }
    }
  }
}`;

interface NotificationsResponse {
  data: {
    Page: {
      notifications: NotificationUnion[]
    }
  }
}

export const getNotifications = async (page: number) => {
  const resp = await axios.post<NotificationsResponse>("/", {
    query: notificationsQuery,
    variables: {
      types: ["ACTIVITY_LIKE"],
      page,
    }
  });

  return resp.data.data.Page.notifications;
}