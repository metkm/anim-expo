import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { MediaObject } from "../../api/objectTypes";

import Text from "../Base/Text";
import MediaCard from "../Media/MediaCard";

interface BrowseRowProps {
  title: string,
  mediaList: MediaObject[]
}

const BrowseRow = ({ title, mediaList }: BrowseRowProps) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
      <FlatList
        data={mediaList}
        renderItem={({ item }) => <MediaCard item={item} style={{ minWidth: 160, maxWidth: 160 }} />}
        showsHorizontalScrollIndicator={false}
        horizontal
        overScrollMode="never"
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 6,
  },
  title: {
    fontSize: 22,
    marginLeft: 10,
    fontFamily: "Overpass_700Bold",
  }
});

export default BrowseRow;
