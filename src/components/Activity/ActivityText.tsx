import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { useColors } from "../../hooks/useColors";

import AnimRenderHtml from "../AnimRenderHtml";
import ActivityUser from "./ActivityUser";
import ActivityStats from "./ActivityStats";

import { TextActivityObject } from "../../api/objectTypes";

interface TextActivityProps {
  activity: TextActivityObject;
}

const ActivityText = ({ activity }: TextActivityProps) => {
  const { colors } = useColors();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <ActivityUser user={activity.user} createdAt={activity.createdAt} />
      <AnimRenderHtml source={{ html: activity.text }} />
      
      <ActivityStats
          activityId={activity.id}
          isLiked={activity.isLiked}
          likeCount={activity.likeCount}
          replyCount={activity.replyCount}
          createdAt={activity.createdAt}
          type="ACTIVITY"
        />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    minHeight: 120,
    padding: 10,
  },
});

export default memo(ActivityText);
