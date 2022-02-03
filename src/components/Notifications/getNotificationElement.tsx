import { ListRenderItem } from "react-native";
import { ActivityLikeNotification, NotificationUnion } from "../../api/objectTypes";
import NotificationLike from "./NotificationLike";

export const getNotificationElement: ListRenderItem<NotificationUnion> = ({ item }) => {
  switch (item.type) {
    case "ACTIVITY_LIKE":
      return <NotificationLike notification={item as ActivityLikeNotification} />
    default:
      return <></>
  }
}
