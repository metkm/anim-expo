import React, { memo } from "react";
import Text from "../Base/Text";
import { StyleSheet, View, Image } from "react-native";
import { ListActivityObject } from "../../types";
import { capitalizeFirstLetter } from "../commonUtils";
import ActivityStats from "./ActivityStats";
import { useColors } from "../../hooks/useColors";

interface ListActivityProps {
  activity: ListActivityObject;
}

const ListActivity = ({ activity }: ListActivityProps) => {
  const { colors, color } = useColors();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      {console.log("render", activity.media.title.userPreferred)}
      <Image style={style.cover} source={{ uri: activity.media.coverImage.large }} />
      <View style={style.contentTextContainer}>
        <Text style={[style.progress, { color }]}>
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
    marginVertical: 3
  },
  cover: {
    height: "100%",
    width: 70,
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

export default memo(ListActivity);
