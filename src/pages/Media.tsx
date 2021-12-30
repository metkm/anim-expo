import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import Text from "../components/Base/Text";
import Loading from "../components/Loading";
import MediaInfo from "../components/Media/MadiaInfo";
import AnimBanner from "../components/AnimBanner";
import MediaHeader from "../components/Media/MediaHeader";
import MediaRelations from "../components/Media/MediaRelations";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./pageProps";

import { MediaObject } from "../types";
import { getMedia } from "../api/media/getMedia";

const Media = ({
  route: {
    params: { mediaId },
  },
}: StackScreenProps<StackParamList, "Media">) => {
  const [media, setMedia] = useState<MediaObject>();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    getMedia(mediaId).then(setMedia);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  if (!media) return <Loading />;
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
      </Animated.ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  containerPadding: {
    padding: 10,
    marginTop: 90,
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

export default Media;
