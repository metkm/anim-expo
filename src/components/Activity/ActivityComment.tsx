import { useRef } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import { useColors } from "../../hooks/useColors";
import { ActivityReplyObject } from "../../api/objectTypes";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { saveActivity } from "../../api/activity/saveActivityText";

interface ActivityCommentProps {
  activityCallback: (activity: ActivityReplyObject) => void;
  activityId: number;
}

const ActivityComment = ({ activityCallback, activityId }: ActivityCommentProps) => {
  const { colors, color } = useColors();
  const text = useRef("");

  const sendComment = async () => {
    const activity = await saveActivity(activityId, text.current);
    activityCallback(activity);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: color }]}>
      <TextInput
        style={{ color: colors.text, flex: 1,  }}
        onChangeText={newText => text.current = newText}
        placeholder="Write a reply!"
        placeholderTextColor="#A1A1A1"
        multiline
      />

      <Icon onPress={sendComment} name="send-circle" size={34} color={colors.text} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
  }
})

export default ActivityComment;
