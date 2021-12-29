import React from "react";
import { StyleSheet, View, FlatList, Animated } from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MediaListObject } from "../../types";
import { LibraryParamList } from "../pageProps";

import MediaCategories from "../../components/Media/MediaCategories";
import MediaCard from "../../components/Media/MediaCard";
import Loading from "../../components/Loading";
import { useLibrary } from "../../hooks/useLibrary";

interface RenderItemProps {
  item: MediaListObject;
}

const renderItem = ({ item }: RenderItemProps) => <MediaCard item={item.media} progress={item.progress} />;

const LibraryPage = ({ route }: BottomTabScreenProps<LibraryParamList, "Anime" | "Manga">) => {
  const { categories, entries, setCategory, category, opacity } = useLibrary(
    route.params.userId,
    route.params.type,
    route.params.category
  );

  if (!entries) return <Loading />;
  return (
    <View style={style.container}>
      <MediaCategories categories={categories} category={category} categoryCallback={setCategory} />
      <Animated.View style={{ opacity, flex: 1 }}>
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={item => item.media.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          style={{ paddingHorizontal: 6 }}
        />
      </Animated.View>
    </View>
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

export default LibraryPage;
