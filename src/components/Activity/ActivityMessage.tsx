import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

import { useColors } from "../../hooks/useColors";
import { MessageActivityObject } from "../../api/objectTypes";

import ActivityUser from "./ActivityUser";
import ActivityStats from "./ActivityStats";
import Markdown from "../../plugins/Markdown";

interface MessageActivityProps {
  activity: MessageActivityObject
}

const ActivityMessage = ({ activity }: MessageActivityProps) => {
  const { colors } = useColors();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <ActivityUser user={activity.messenger} createdAt={activity.createdAt} />
      <Markdown>
        {activity.message}
      </Markdown>

      <ActivityStats
        {...activity}
        type="ACTIVITY"
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 10,
    elevation: 1,
  },
});

export default memo(ActivityMessage);
