import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { MediaObject } from "../../types";
import MediaCard from "./MediaCard";

interface MediaRelationsProps {
  mediaList: MediaObject[]
}

const MediaRelations = ({ mediaList }: MediaRelationsProps) => {
  return (
    <FlatList 
      data={mediaList}
      renderItem={({ item }) => <MediaCard item={item} style={{ width: 150 }} />}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  )
}

export default MediaRelations;
