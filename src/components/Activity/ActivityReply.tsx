import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { ActivityReplyObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";

import ActivityStats from "./ActivityStats";
import ActivityUser from "./ActivityUser";
import Markdown from "../../plugins/Markdown";

interface ActivityReplyProps {
  activityReply: ActivityReplyObject
}

const ActivityReply = ({ activityReply }: ActivityReplyProps) => {
  const { colors } = useColors();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <ActivityUser user={activityReply.user} createdAt={activityReply.createdAt} />
      <Markdown>
        {activityReply.text}
      </Markdown>

      <ActivityStats
        {...activityReply}
        type="ACTIVITY_REPLY"
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 1,
  }
});

export default memo(ActivityReply);
