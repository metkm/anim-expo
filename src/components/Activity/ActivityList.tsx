import React, { memo } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { capitalizeFirstLetter } from "../commonUtils";

import { ListActivityObject } from "../../api/objectTypes";
import { AppNavigationProps } from "../../pages/props";

import { useNavigation } from "@react-navigation/native";
import { useColors } from "../../hooks/useColors";

import Text from "../Base/Text";
import ActivityStats from "./ActivityStats";

interface ListActivityProps {
  activity: ListActivityObject;
}

const ActivityList = ({ activity }: ListActivityProps) => {
  const { colors, color } = useColors();
  const navigation = useNavigation<AppNavigationProps<"Media">>();

  const toMedia = () => {
    navigation.push("Media", {
      mediaId: activity.media.id,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={[styles.coverContainer, { backgroundColor: colors.card }]} onPress={toMedia}>
        <Image style={styles.cover} source={{ uri: activity.media.coverImage.large }} />
      </Pressable>

      <View style={[styles.content, { backgroundColor: colors.card }]}>
        <Text style={[styles.progress, { color }]}>
          {capitalizeFirstLetter(activity.status)} {activity.progress && `${activity.progress} of `}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {activity.media.title.userPreferred}
        </Text>

        <ActivityStats
           {...activity}
           type="ACTIVITY"
         />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 4,
  },
  coverContainer: {
    borderRadius: 6,
    marginRight: 4,
    overflow: "hidden",
    elevation: 1,
  },
  cover: {
    height: 100,
    width: 70,
  },
  content: {
    flex: 1,
    elevation: 1,
    borderRadius: 6,
    padding: 6,
  },
  title: {
    fontWeight: "bold",
  },
  progress: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default memo(ActivityList);
