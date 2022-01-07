import React, { memo, useState } from "react";
import { StyleSheet, View, Image, Text, ViewProps, Pressable } from "react-native";
import { MediaObject } from "../../types";
import { timeUntil } from "./MediaUtils";
import { capitalizeFirstLetter } from "../commonUtils";

// components
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MediaNavigationProps } from "../../pages/pageProps";
import MediaEdit from "./MediaEdit";

interface MediaCardProps extends ViewProps {
  item: MediaObject;
  progress?: number;
  showType?: boolean;
}

const MediaCard = ({ item, progress, ...rest }: MediaCardProps) => {
  const navigation = useNavigation<MediaNavigationProps>();
  const [isVisible, setIsVisible] = useState(false);

  const toMedia = () => {
    navigation.push("Media", { mediaId: item.id });
  };

  const longPressHandler = () => {
    setIsVisible(visible => !visible);
  }

  return (
    <Pressable onPress={toMedia} onLongPress={longPressHandler} style={[style.container, { ...(rest.style as {}) }]}>
      <LinearGradient colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 1)"]} style={{ flex: 1 }}>
        <Image style={style.cover} source={{ uri: item.coverImage.extraLarge }} />

        {item.type && <Text style={[style.topInfo, style.type]}>
          {capitalizeFirstLetter(item.type)}
        </Text>}

        <Text style={[style.topInfo, style.episodes]}>
          {progress! > 0 && `${progress}/`}
          {item.episodes || "?"}
        </Text>

        <View style={style.textContainer}>
          <Text style={style.title}>{item.title.userPreferred}</Text>
          <Text style={style.untilAir} numberOfLines={1}>
            {item.nextAiringEpisode?.timeUntilAiring
              ? `EP ${item.nextAiringEpisode.episode}: ${timeUntil(item.nextAiringEpisode?.timeUntilAiring)}`
              : capitalizeFirstLetter(item.status)}
          </Text>
        </View>
      </LinearGradient>

      <MediaEdit isVisible={isVisible} setIsVisible={setIsVisible} mediaId={item.id} />
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    minHeight: 250,
    borderRadius: 6,
    position: "relative",
    overflow: "hidden",
  },
  cover: {
    ...(StyleSheet.absoluteFill as Object),
    zIndex: -10,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: "auto",
    padding: 10,
  },
  title: {
    color: "white",
    fontFamily: "Overpass_700Bold",
  },
  untilAir: {
    fontSize: 12,
    color: "white",
  },
  topInfo: {
    top: 4,
    position: "absolute",
    borderRadius: 1000,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  episodes: {
    right: 4,
  },
  type: {
    left: 4,
  },
});

export default memo(MediaCard);
