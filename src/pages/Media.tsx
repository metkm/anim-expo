import React, { useState, useEffect } from "react";
import axios from "axios";

import { StyleSheet, View, ScrollView } from "react-native";
import Loading from "../components/Loading";
import MediaHeader from "../components/Media/MediaHeader";
import MediaInfo from "../components/Media/MadiaInfo";

import { StackScreenProps } from "@react-navigation/stack";

import { StackParamList } from "./pageProps";
import { MediaObject } from "../types";
import { ResponseMedia } from "../types";
import { MediaQuery } from "../graphql/queries/media/MediaQuery";
import MediaRelations from "../components/Media/MediaRelations";
import Text from "../components/Base/Text";

const getMedia = async (id: number) => {
  const resp = await axios.post<ResponseMedia>("/", {
    query: MediaQuery,
    variables: { id },
  });

  return resp;
};

const Media = ({ route }: StackScreenProps<StackParamList, "Media">) => {
  const [media, setMedia] = useState<MediaObject>();

  useEffect(() => {
    getMedia(route.params.mediaId).then(resp => {
      setMedia(resp.data.data.Media);
    })
  }, []);

  if (!media) return <Loading />
  return (
    <ScrollView>
      <MediaHeader media={media} />
      <View style={style.containerPadding}>
        <MediaInfo media={media} />
        <>
          <Text style={style.title}>Relations</Text>
          <MediaRelations mediaList={media.relations.nodes} />
        </>
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
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 6,
  }
});

export default Media;
