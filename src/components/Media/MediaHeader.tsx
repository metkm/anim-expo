import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MediaObject } from "../../types";
import Text from "../Base/Text";

interface MediaHeaderProps {
  media: MediaObject;
}

const MediaHeader = ({ media }: MediaHeaderProps) => {
  return (
    <View style={style.coverWrapper}>
      <Image source={{ uri: media.coverImage.large }} style={style.cover} />
      <Text numberOfLines={3} style={style.title}>
        {media.title.userPreferred}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  cover: {
    height: 180,
    width: 120,
    borderRadius: 6,
    marginLeft: 8,
  },
  coverWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
});

export default MediaHeader;
