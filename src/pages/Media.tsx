import React, { Suspense, useState } from "react";
import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import Text from "../components/Base/Text";
import Loading from "../components/AnimLoading";
import MediaInfo from "../components/Media/MadiaInfo";
import AnimBanner from "../components/AnimBanner";
import MediaHeader from "../components/Media/MediaHeader";
import MediaRelations from "../components/Media/MediaRelations";
import MediaCharacters from "../components/Media/MediaCharacters";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./pageProps";

import { MediaObject } from "../api/objectTypes";
import { getMedia } from "../api/media/getMedia";
import { usePromise } from "../hooks/usePromise";

interface MediaProps {
  mediaReader: () => MediaObject
}

const Media = ({ mediaReader }: MediaProps) => {
  const [media] = useState(() => mediaReader());
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  }, []);

  return (
    <View>
      <AnimBanner
        bannerImage={media.bannerImage}
        scrollY={scrollY}
        expandedHeight={190}
        title={media.title.userPreferred}
      />

      <Animated.ScrollView style={style.containerPadding} onScroll={scrollHandler}>
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
    </View>
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
});

export default MediaSuspense;
