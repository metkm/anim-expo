import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MediaObject } from "../../types";
import Text from "../Base/Text";

interface MediaHeaderProps {
  media: MediaObject
}

const MediaHeader = ({ media }: MediaHeaderProps) => {
  return (
    <View>
      <Image source={{ uri: media.bannerImage }} style={style.banner} />
      <View style={style.coverWrapper}>
        <Image source={{ uri: media.coverImage.large }} style={style.cover} />
        <Text numberOfLines={3} style={style.title}>{media.title.userPreferred}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  banner: {
    height: 200
  },
  title: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  cover: {
    height: 180,
    width: 120,
    marginTop: -75,
    borderRadius: 6,
    marginLeft: 10,
  },
  coverWrapper: {
    flexDirection: "row",
  }
})

export default MediaHeader;
