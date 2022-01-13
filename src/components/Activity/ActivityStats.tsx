import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

// components
import Text from "../Base/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { likeActivity } from "../../api/activity/likeActivity";
import { ActivityUnion } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";
import { timeSince } from "../commonUtils";

interface ActivityStatsProps {
  activity: ActivityUnion;
}

interface LikeObject {
  id: number;
  isLiked: boolean;
  likeCount: number;
}

const ActivityStats = ({ activity }: ActivityStatsProps) => {
  const { color, colors } = useColors();
  const [union, setUnion] = useState<LikeObject>({
    id: activity.id,
    isLiked: activity.isLiked,
    likeCount: activity.likeCount
  });

  // const commentHandler = () => {

  // }

  const likeHandler = async () => {
    const respUnion = await likeActivity(union.id, "ACTIVITY");
    setUnion(respUnion);
  }

  return (
    <View style={style.container}>
      <Text style={style.timeText}>{timeSince(new Date(activity.createdAt * 1000))}</Text>

      <View style={style.stats}>
        <Pressable style={style.stat}>
          <Icon name="comment" color={colors.text} size={14} />
          <Text style={style.count}>{activity.replyCount || ""}</Text>
        </Pressable>
        
        <Pressable style={style.stat} onPress={likeHandler}>
          <Icon name="heart" color={union.isLiked ? color : colors.text} size={14} />
          <Text style={style.count}>{union.likeCount || ""}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 10,
  },
  stats: {
    flexDirection: "row",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 2,
  },
  count: {
    fontSize: 14, 
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    marginLeft: 2,
  },
  timeText: {
    flex: 1,
    fontSize: 12,
  },
});

export default ActivityStats;
