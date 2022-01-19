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
    <View style={[style.container, { backgroundColor: colors.card }]} >
      <Pressable style={style.coverContainer} onPress={toMedia}>
        <Image style={style.cover} source={{ uri: activity.media.coverImage.large }} />
      </Pressable>
      <View style={style.contentTextContainer}>
        <Text style={[style.progress, { color }]}>
          {capitalizeFirstLetter(activity.status)} {activity.progress && `${activity.progress} of `}
        </Text>
        <Text style={style.title} numberOfLines={2}>{activity.media.title.userPreferred}</Text>

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
    maxHeight: 90,
    elevation: 1,
  },
  coverContainer: {
    height: "100%",
    width: 70,
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  contentTextContainer: {
    flex: 1,
    padding: 6,
  },
  title: {
    fontWeight: "bold",
  },
  progress: {
    fontSize: 12,
  },
  bottom: {
    flexDirection: "row",
    marginTop: "auto",
  },
});

export default memo(ActivityList);
