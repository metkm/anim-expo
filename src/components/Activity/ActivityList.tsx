import React, { memo } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { capitalizeFirstLetter } from "../commonUtils";

import { MediaNavigationProps } from "../../pages/pageProps";
import { ListActivityObject } from "../../api/objectTypes";

import { useNavigation } from "@react-navigation/native";
import { useColors } from "../../hooks/useColors";

import Text from "../Base/Text";
import ActivityStats from "./ActivityStats";

interface ListActivityProps {
  activity: ListActivityObject;
}

const ActivityList = ({ activity }: ListActivityProps) => {
  const { colors, color } = useColors();
  const navigation = useNavigation<MediaNavigationProps>();

  const toMedia = () => {
    navigation.push("Media", {
      mediaId: activity.media.id,
    });
  };

  return (
    <View style={style.container}>
      <Pressable style={[style.coverContainer, { backgroundColor: colors.card }]} onPress={toMedia}>
        <Image style={style.cover} source={{ uri: activity.media.coverImage.large }} />
      </Pressable>

      <View style={[style.content, { backgroundColor: colors.card }]}>
        <Text style={[style.progress, { color }]}>
          {capitalizeFirstLetter(activity.status)} {activity.progress && `${activity.progress} of `}
        </Text>
        <Text style={style.title} numberOfLines={2}>
          {activity.media.title.userPreferred}
        </Text>

        <ActivityStats
           {...activity}
           type="ACTIVITY"
           bannerImage={activity.media.bannerImage}
         />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
