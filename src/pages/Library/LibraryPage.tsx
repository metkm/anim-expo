import React, { Suspense, useState, useEffect, useRef } from "react";
import { FlatList, FlatListProps, StyleSheet, View } from "react-native";
import { MediaListCollectionObject, MediaListObject } from "../../types";
import { timingConfig } from "../../constants/reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import { LibraryPageParamList } from "../pageProps";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { getEntries } from "../../api/library/getEntries";

import MediaCategories from "../../components/Media/MediaCategories";
import MediaCard from "../../components/Media/MediaCard";
import Loading from "../../components/AnimLoading";
import { usePromise } from "../../hooks/usePromise";

interface LibraryPage {
  libraryReader: () => MediaListCollectionObject;
  refresh: () => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<MediaListObject>>(FlatList);

const LibraryPage = ({ libraryReader, refresh }: LibraryPage) => {
  const [listCollection] = useState(() => libraryReader());
  const [entries, setEntries] = useState(listCollection.lists[0].entries);
  const categories = useRef(listCollection.lists.map(list => list.name));
  const category = useRef(categories.current[0]);
  const opacity = useSharedValue(1);

  const categoryCallback = (newCategory: string) => {
    const list = listCollection.lists.find(list => list.name == newCategory);
    if (!list) return;

    category.current = newCategory;
    opacity.value = withTiming(0, timingConfig, () => {
      runOnJS(setEntries)(list.entries);
    })
  }

  useEffect(() => {
    opacity.value = withTiming(1, timingConfig);
  }, [entries])

  useEffect(() => {
    let categoryIndex = listCollection.lists.findIndex(list => list.name == category.current);
    setEntries(listCollection.lists[categoryIndex || 0].entries);
  }, [listCollection])
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  
  return (
    <View style={style.container}>
      <MediaCategories categories={categories.current} callback={categoryCallback} />
      <AnimatedFlatList
        data={entries}
        // renderItem={({ item }) => <Text>{item.media.title.userPreferred}</Text>}
        renderItem={({ item }) => <MediaCard editCallback={refresh} item={item.media} progress={item.progress} />}
        keyExtractor={item => item.media.id.toString()}
        numColumns={2}
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        style={[animatedStyle, { paddingHorizontal: 6 }]}
      />
    </View>
  )
};

const LibraryPageSuspense = ({
  route: {
    params: { userId, type },
  },
}: BottomTabScreenProps<LibraryPageParamList, "Anime" | "Manga">) => {
  const [libraryReader, libraryUpdater] = usePromise(getEntries, userId, type);

  const refresh = () => {
    libraryUpdater(userId, type);
  }

  return (
    <Suspense fallback={<Loading />}>
      <LibraryPage libraryReader={libraryReader} refresh={refresh} />
    </Suspense>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LibraryPageSuspense;
