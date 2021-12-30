import React, { useState, useEffect } from "react";

import { StyleSheet, View, ScrollView } from "react-native";
import Loading from "../components/Loading";
import MediaHeader from "../components/Media/MediaHeader";
import MediaInfo from "../components/Media/MadiaInfo";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./pageProps";

import { MediaObject } from "../types";
import { getMedia } from "../api/media/getMedia";

import MediaRelations from "../components/Media/MediaRelations";
import Text from "../components/Base/Text";

const Media = ({ route: { params: { mediaId } } }: StackScreenProps<StackParamList, "Media">) => {
  const [media, setMedia] = useState<MediaObject>();

  useEffect(() => {
    getMedia(mediaId).then(setMedia);
  }, []);

  if (!media) return <Loading />
  return (
    <ScrollView>
      <MediaHeader media={media} />
      <View style={style.containerPadding}>
        <MediaInfo media={media} />

        {media.relations.nodes.length > 0 && 
          <>
            <Text style={style.title}>Relations</Text>
            <MediaRelations mediaList={media.relations.nodes} />
          </>
        }
      </View>
    </ScrollView>
  )
};

const style = StyleSheet.create({
  containerPadding: {
    padding: 10,
  },
  relations: {
    flexDirection: "row"
  },
  title: {
    fontFamily: "Overpass_700Bold",
    fontSize: 20,
    marginLeft: 6,
  }
});

export default Media;
