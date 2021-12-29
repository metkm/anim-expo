import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import axios from "axios";

import { MediaListCollectionQuery } from "../graphql/queries/media/MediaListCollectionQuery";
import { ResponseMediaListCollection } from "../types/responses";
import { MediaListGroupObject, MediaListObject } from "../types";

import { useIsFocused } from "@react-navigation/native";

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

export const useLibrary = (id: number, type: string, defaultCategory: string) => {
  const mediaListGroups = useRef<MediaListGroupObject[]>([]);
  const [category, setCategory] = useState<string>(defaultCategory);
  const [categories, setCategories] = useState<string[]>([]);
  const [entries, setEntries] = useState<MediaListObject[]>();
  const opacity = useRef(new Animated.Value(1)).current;
  const isFocused = useIsFocused();

  const { fadeIn, fadeOut } = pageChange(opacity);

  useEffect(() => {
    getMedia(id, type).then(resp => {
      let lists = resp.data.data.MediaListCollection.lists;
      mediaListGroups.current = lists;

      let categoryList = lists.map(mediaList => mediaList.name);
      setCategories(categoryList);

      let group = lists.find(mediaList => mediaList.name == category)!;
      setEntries(group?.entries);
    });
  }, [isFocused]);

  useEffect(() => {
    if (!category || mediaListGroups.current.length == 0) return;

    fadeOut(() => {
      let group = mediaListGroups.current.find(mediaList => mediaList.name == category)!;
      setEntries(group?.entries);

      fadeIn();
    });
  }, [category]);

  return { categories, setCategory, entries, category, opacity };
};

export default useLibrary;
