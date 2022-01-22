import React, { Suspense, useState } from "react";
import { StyleSheet } from "react-native";

import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import Text from "../components/Base/Text";
import Loading from "../components/AnimLoading";
import MediaEdit from "../components/Media/MediaEdit";
import MediaInfo from "../components/Media/MadiaInfo";
import AnimBanner from "../components/AnimBanner";
import MediaHeader from "../components/Media/MediaHeader";
import MediaRelations from "../components/Media/MediaRelations";
import MediaCharacters from "../components/Media/MediaCharacters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./pageProps";

import { MediaObject } from "../api/objectTypes";
import { getMedia } from "../api/media/getMedia";
import { usePromise } from "../hooks/usePromise";


interface MediaProps {
  mediaReader: () => MediaObject
}

const Media = ({ mediaReader }: MediaProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [media] = useState(() => mediaReader());
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  }, []);

  const toggleVisible = () => {
    setIsVisible(visible => !visible);
  }

  return (
    <>
      <AnimBanner
        bannerImage={media.bannerImage}
        scrollY={scrollY}
        expandedHeight={180}
        title={media.title.userPreferred}
      >
        <Icon style={style.icon} onPress={toggleVisible} name="pencil" color="white" size={22} />
        <MediaEdit media={media} isVisible={isVisible} setIsVisible={setIsVisible} />
      </AnimBanner>

      <Animated.ScrollView style={style.containerPadding} overScrollMode="never" onScroll={scrollHandler}>
        <MediaHeader media={media} />
        <MediaInfo media={media} />

        {media.relations.nodes.length > 0 && (
          <>
            <Text style={style.title}>Relations</Text>
            <MediaRelations mediaList={media.relations.nodes} />
          </>
        )}

        <>
          <Text style={style.title}>Characters</Text>
          <MediaCharacters characterList={media.characters.edges} />
        </>
      </Animated.ScrollView>
    </>
  );
};

const MediaSuspense = ({ route: { params: { mediaId } } }: StackScreenProps<StackParamList, "Media">) => {
  const [mediaReader] = usePromise(getMedia, mediaId);

  return (
    <Suspense fallback={<Loading />} >
      <Media mediaReader={mediaReader} />
    </Suspense>
  )
}

const style = StyleSheet.create({
  containerPadding: {
    marginTop: 90,
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 8,
    borderRadius: 100,
  }
});

export default MediaSuspense;
