import {
  ActivityType,
  ActivityUnion,
  ListActivityObject,
  TextActivityObject,
  MessageActivityObject,
} from "../../api/objectTypes";

import ActivityList from "./ActivityList";
import ActivityText from "./ActivityText";
import ActivityMessage from "./ActivityMessage";

export const getRenderElement = (activity: ActivityUnion, type: ActivityType) => {
  switch (type) {
    case "ANIME_LIST":
      return <ActivityList activity={activity as ListActivityObject} />;
    case "MANGA_LIST":
      return <ActivityList activity={activity as ListActivityObject} />;
    case "TEXT":
      return <ActivityText activity={activity as TextActivityObject} />;
    case "MESSAGE":
      return <ActivityMessage activity={activity as MessageActivityObject} />;
    default:
      return <></>;
  }
};
