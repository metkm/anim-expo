import React, { Suspense, useState } from "react";
import { StyleSheet } from "react-native";

import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import Text from "../components/Base/Text";
import Loading from "../components/AnimLoading";
import MediaEdit from "../components/Media/MediaEdit";
import MediaInfo from "../components/Media/MediaInfo";
import MediaBanner from "../components/Media/MediaBanner";
import MediaHeader from "../components/Media/MediaHeader";
import MediaRelations from "../components/Media/MediaRelations";
import MediaCharacters from "../components/Media/MediaCharacters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useHeaderHeight } from "@react-navigation/elements";
import { AppScreenProps } from "./props";

import { MediaObject } from "../api/objectTypes";
import { getMedia } from "../api/media/getMedia";
import { usePromise } from "../hooks/usePromise";
import { PortalProvider } from "@gorhom/portal";

interface MediaProps {
  mediaReader: () => MediaObject
}

const Media = ({ mediaReader }: MediaProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [media] = useState(() => mediaReader());
  const scrollY = useSharedValue(0);
  const headerHeight = useHeaderHeight();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  }, []);

  const toggleVisible = () => {
    setIsVisible(visible => !visible);
  }

  return (
    <PortalProvider>
      <MediaBanner uri={media.bannerImage} y={scrollY}>
        <Icon style={styles.icon} onPress={toggleVisible} name="pencil" color="white" size={22} />
      </MediaBanner>
      <MediaEdit media={media} isVisible={isVisible} editCallback={toggleVisible} />

      <Animated.ScrollView style={[styles.containerPadding, { marginTop: headerHeight }]} overScrollMode="never" onScroll={scrollHandler}>
        <MediaHeader media={media} />
        <MediaInfo media={media} />

        {media.relations.nodes.length > 0 && (
          <>
            <Text style={styles.title}>Relations</Text>
            <MediaRelations mediaList={media.relations.nodes} />
          </>
        )}

        <>
          <Text style={styles.title}>Characters</Text>
          <MediaCharacters characterList={media.characters.edges} />
        </>
      </Animated.ScrollView>
    </PortalProvider>
  );
};

const MediaSuspense = ({ route: { params: { mediaId } } }: AppScreenProps<"Media">) => {
  const [mediaReader] = usePromise(getMedia, mediaId);

  return (
    <Suspense fallback={<Loading />} >
      <Media mediaReader={mediaReader} />
    </Suspense>
  )
}

const styles = StyleSheet.create({
  containerPadding: {
    paddingHorizontal: 6,
  },
  relations: {
    flexDirection: "row",
  },
  title: {
    fontFamily: "Overpass_700Bold",
    fontSize: 20,
    marginLeft: 6,
  },
  icon: {
    marginLeft: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 8,
    borderRadius: 100,
  },
  banner: {
    overflow: "hidden",
    position: "absolute",
    left: 0,
    right: 0,
  }
});

export default MediaSuspense;
