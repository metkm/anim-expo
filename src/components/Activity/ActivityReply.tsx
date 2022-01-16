import { StyleSheet, View } from "react-native";
import { ActivityReplyObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";

import AnimRenderHtml from "../AnimRenderHtml";
import ActivityStats from "./ActivityStats";
import ActivityUser from "./ActivityUser";

interface ActivityReplyProps {
  activityReply: ActivityReplyObject
}

const ActivityReply = ({ activityReply }: ActivityReplyProps) => {
  const { colors } = useColors();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <ActivityUser user={activityReply.user} createdAt={activityReply.createdAt} />
      <AnimRenderHtml source={{ html: activityReply.text }} />
      <ActivityStats
        activityId={activityReply.id}
        isLiked={activityReply.isLiked}
        likeCount={activityReply.likeCount}
        createdAt={activityReply.createdAt}
        type="ACTIVITY_REPLY"
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 6,
  }
});

export default ActivityReply;
