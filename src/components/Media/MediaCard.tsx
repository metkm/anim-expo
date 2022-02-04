import React, { memo, useState } from "react";
import { StyleSheet, View, Image, ViewProps, Pressable, ViewStyle } from "react-native";

import { capitalizeFirstLetter } from "../commonUtils";
import { MediaObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";
import { timeUntil } from "./MediaUtils";

import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "../../pages/props";

import { Portal } from "@gorhom/portal";
import Text from "../Base/Text";
import MediaEdit from "./MediaEdit";

interface MediaCardProps extends ViewProps {
  item: MediaObject;
  progress?: number;
  showType?: boolean;
  editCallback?: (media: MediaObject, oldMedia: MediaObject) => void;
}

const MediaCard = ({ item, progress, editCallback, ...rest }: MediaCardProps) => {
  const { colors } = useColors();
  const [media] = useState(item);
  const navigation = useNavigation<AppNavigationProps<"Media">>();
  const [isVisible, setIsVisible] = useState(false);

  const toMedia = () => {
    navigation.push("Media", { mediaId: media.id });
  };

  const longPressHandler = () => {
    setIsVisible(isVisib => !isVisib);
  };

  const containerStyle: ViewStyle = {
    ...style.container,
    ...rest.style as {},
    backgroundColor: colors.background
  }

  const boxStyle: ViewStyle = {
    ...style.box,
    backgroundColor: colors.background
  }

  return (
    <Pressable onPress={toMedia} onLongPress={longPressHandler} style={containerStyle}>
      <View style={boxStyle}>
        <Image style={style.cover} source={{ uri: media.coverImage.extraLarge }} />

        {media.type ? <Text style={[style.topInfo, style.type]}>{capitalizeFirstLetter(media.type)}</Text>: <></>}

        <Text style={[style.topInfo, style.episodes]}>
          {progress! > 0 && `${progress}/`}
          {media.episodes || "?"}
        </Text>

      </View>
      
      <View style={style.textContainer}>
        <Text numberOfLines={1} style={style.until}>
          {media.nextAiringEpisode?.timeUntilAiring
          ? `EP ${media.nextAiringEpisode.episode}: ${timeUntil(media.nextAiringEpisode?.timeUntilAiring)}`
          : capitalizeFirstLetter(media.status)}
        </Text>

        <Text numberOfLines={1} style={style.title}>{media.title.userPreferred}</Text>
      </View>

      <Portal>
        <MediaEdit editCallback={editCallback} media={item} isVisible={isVisible} />
      </Portal>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    minHeight: 280,
  },
  cover: {
    flex: 1,
    borderRadius: 6,
  },
  box: {
    flex: 1,
    elevation: 1,
    borderRadius: 6,
  },
  textContainer: {
    marginTop: 4,
    marginHorizontal: 4,
  },
  title: {
    fontFamily: "Overpass_700Bold",
    lineHeight: 18,
  },
  until: {
    fontSize: 12,
  },
  topInfo: {
    top: 4,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 1000,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  episodes: {
    right: 4,
  },
  type: {
    left: 4,
  },
});

export default memo(MediaCard);
