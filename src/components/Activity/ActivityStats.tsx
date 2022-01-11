import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityUnion } from "../../api/objectTypes";
import { timeSince } from "../commonUtils";

// components
import Text from "../Base/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useColors } from "../../hooks/useColors";

interface ActivityStatsProps {
  activity: ActivityUnion;
}

const ActivityStats = ({ activity }: ActivityStatsProps) => {
  const { color } = useColors();

  return (
    <View style={style.container}>
      <Text style={style.timeText}>{timeSince(new Date(activity.createdAt * 1000))}</Text>

      <View style={style.stats}>
        <View style={style.stat}>
          <Text style={style.count}>{activity.replyCount || ""}</Text>
          <Icon name="comment" color={color} size={12} />
        </View>
        <View style={style.stat}>
          <Text style={style.count}>{activity.likeCount  || ""}</Text>
          <Icon name="heart" color={color} size={12} />
        </View>
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
    marginLeft: 4,
  },
  count: {
    fontWeight: "800",
    fontSize: 12,
    textAlign: "center"
  },
  timeText: {
    flex: 1,
    fontSize: 12,
  },
});

export default ActivityStats;
