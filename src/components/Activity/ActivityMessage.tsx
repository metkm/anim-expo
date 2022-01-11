import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

import { useColors } from "../../hooks/useColors";
import { MessageActivityObject } from "../../api/objectTypes";

import ActivityUser from "./ActivityUser";
import AnimRenderHtml from "../AnimRenderHtml";
import ActivityStats from "./ActivityStats";

interface MessageActivityProps {
  activity: MessageActivityObject
}

const MessageActivity = ({ activity }: MessageActivityProps) => {
  const { colors } = useColors();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <ActivityUser activity={activity} />
      <AnimRenderHtml source={{ html: activity.message }} />
      <ActivityStats activity={activity} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 4,
    marginVertical: 3,
  },
});

export default memo(MessageActivity);
