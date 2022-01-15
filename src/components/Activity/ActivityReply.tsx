import { StyleSheet, View } from "react-native";
import { ActivityReplyObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";

import AnimRenderHtml from "../AnimRenderHtml";
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
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 3,
  }
});

export default ActivityReply;
