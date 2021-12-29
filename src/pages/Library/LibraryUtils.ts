import axios from "axios";
import { ResponseMediaListCollection } from "../../types/responses";
import { MediaListCollectionQuery } from "../../graphql/queries/media/MediaListCollectionQuery";

import { Animated } from "react-native";

export const getMedia = async (userId: number, type: string) => {
  const resp = await axios.post<ResponseMediaListCollection>("/", {
    query: MediaListCollectionQuery,
    variables: {
      type,
      userId,
    },
  });

  return resp;
};

export const pageChange = (opacity: Animated.Value) => {
  const fadeOut = (callback: () => void) => {
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start(callback);
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
    }).start();
  };

  return { fadeIn, fadeOut };
};
