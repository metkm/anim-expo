import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MediaObject } from "../../api/objectTypes";

import Text from "../Base/Text";

interface MediaHeaderProps {
  media: MediaObject;
}

const MediaHeader = ({ media }: MediaHeaderProps) => {
  return (
    <View style={style.coverWrapper}>
      <Image source={{ uri: media.coverImage.large }} style={style.cover} />
      <Text numberOfLines={2} style={style.title}>
        {media.title.userPreferred}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    flex: 1,
    height: 76,
    padding: 6,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 22,
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
