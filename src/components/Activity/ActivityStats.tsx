import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// components
import Text from "../Base/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { likeActivity } from "../../api/activity/likeActivity";
import { LikeableType } from "../../api/objectTypes";

import { ActivityNavigationProps } from "../../pages/pageProps";
import { useColors } from "../../hooks/useColors";
import { timeSince } from "../commonUtils";

interface ActivityStatsProps {
  replyCount?: number;
  likeCount: number;
  isLiked: boolean;
  id: number;
  createdAt: number;
  type: LikeableType;
  bannerImage?: string;
}

interface LikeObject {
  id: number;
  isLiked: boolean;
  likeCount: number;
}

const ActivityStats = ({ replyCount, likeCount, isLiked, id, createdAt, type, bannerImage }: ActivityStatsProps) => {
  const navigation = useNavigation<ActivityNavigationProps>()
  const { color, colors } = useColors();
  const [union, setUnion] = useState<LikeObject>({
    id: id,
    isLiked,
    likeCount
  })

  const activityHandler = () => {
    navigation.navigate("Activity", {
      activityId: id,
      bannerImage
    })
  }

  const likeHandler = async () => {
    const resp = await likeActivity(id, type);
    setUnion(resp);
  }

  return (
    <View style={style.container}>
      <Text style={style.timeText}>{timeSince(new Date(createdAt * 1000))}</Text>

      <View style={style.stats}>
        {replyCount ? (
          <Pressable style={style.stat} onPress={activityHandler}>
            <Icon name="comment" color={colors.text} size={14} />
            <Text style={style.count}>{replyCount || ""}</Text>
          </Pressable>
        ) : (
          <></>
        )}

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
