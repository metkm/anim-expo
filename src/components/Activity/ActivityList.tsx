import React, { memo } from "react";
import Text from "../Base/Text";
import { StyleSheet, View, Image } from "react-native";
import { ListActivityObject } from "../../types";
import { capitalizeFirstLetter } from "../commonUtils";
import ActivityStats from "./ActivityStats";

import { darkColors } from "../../constants/theme";
import { useTheme } from "@react-navigation/native";

interface ListActivityProps {
  activity: ListActivityObject;
}

const ListActivity = ({ activity }: ListActivityProps) => {
  const { colors } = useTheme();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <Image style={style.cover} source={{ uri: activity.media.coverImage.large }} />
      <View style={style.contentTextContainer}>
        <Text style={style.progress}>
          {capitalizeFirstLetter(activity.status)} {activity.progress && `${activity.progress} of `}
        </Text>
        <Text style={style.title}>{activity.media.title.userPreferred}</Text>
        
        <ActivityStats activity={activity} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 90,
    borderRadius: 4,
  },
  cover: {
    height: "100%",
    width: 70,
    borderRadius: 4,
  },
  contentTextContainer: {
    flex: 1,
    padding: 6,
  },
  title: {
    fontWeight: "600",
  },
  progress: {
    color: darkColors.third,
    flexShrink: 1,
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    marginTop: "auto",
  },
});

export default memo(ListActivity);
