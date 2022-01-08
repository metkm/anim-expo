import React, { Suspense, useMemo, useState, useCallback, useEffect } from "react";
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
}

interface RenderItemProps {
  item: MediaListObject;
}

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<MediaListObject>>(FlatList);
const renderItem = ({ item }: RenderItemProps) => <MediaCard item={item.media} progress={item.progress} />;

const LibraryPage = ({ libraryReader }: LibraryPage) => {
  const [listCollection] = useState(() => libraryReader());
  const [entries, setEntries] = useState(listCollection.lists[0].entries);
  const categories = useMemo(() => listCollection.lists.map(list => list.name), [listCollection]);
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(1, timingConfig);
  }, [entries])

  const categoryCallback = useCallback((category: string) => {
    const list = listCollection.lists.find(list => list.name == category);
    if (!list) return;

    opacity.value = withTiming(0, timingConfig, () => {
      runOnJS(setEntries)(list.entries);
    })
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={style.container}>
      <MediaCategories categories={categories} callback={categoryCallback} />
      <AnimatedFlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.media.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        style={[animatedStyle, { paddingHorizontal: 6 }]}
      />
    </View>
  );
};

const LibraryPageSuspense = ({
  route: {
    params: { userId, type },
  },
}: BottomTabScreenProps<LibraryPageParamList, "Anime" | "Manga">) => {
  const [libraryReader] = usePromise(getEntries, userId, type);

  return (
    <Suspense fallback={<Loading />}>
      <LibraryPage libraryReader={libraryReader} />
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
