import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { ActivityReplyObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";
import parse from "../../plugins/markdown";

import ActivityStats from "./ActivityStats";
import ActivityUser from "./ActivityUser";

interface ActivityReplyProps {
  activityReply: ActivityReplyObject
}

const ActivityReply = ({ activityReply }: ActivityReplyProps) => {
  const { colors } = useColors();
  const parsed = parse(activityReply.text);

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <ActivityUser user={activityReply.user} createdAt={activityReply.createdAt} />
      <>
        {parsed}
      </>

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
