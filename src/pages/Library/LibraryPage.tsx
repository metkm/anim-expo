import React, { Suspense, useEffect } from "react";
import { FlatList } from "react-native";

import { LibraryPageParamList } from "../props";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { MediaListCollectionObject, MediaType } from "../../api/objectTypes";
import { getEntries } from "../../api/library/getEntries";
import { usePromise } from "../../hooks/usePromise";

import MediaCategories from "../../components/Media/MediaCategories";
import MediaCard from "../../components/Media/MediaCard";
import Loading from "../../components/AnimLoading";

import { useDispatch } from "react-redux";
import { RootDispatch } from "../../store";
import { useCategories } from "../../hooks/useCategories";

interface LibraryPage {
  libraryReader: () => MediaListCollectionObject;
  refresh: () => void;
  type: MediaType;
}

const LibraryPage = ({ libraryReader, refresh, type }: LibraryPage) => {
  const { categories, setCategories } = useCategories(type);

  const findEntries = (category: string) => {
    return listCollection.lists.find(list => {
      return list.name == category;
    });
  };

  const listCollection = libraryReader();
  const dispatch = useDispatch<RootDispatch>();
  const entries = findEntries(categories[0])?.entries;

  useEffect(() => {
    const newCategories = listCollection.lists.map(list => list.name);
    dispatch(setCategories([...newCategories]));
  }, []);

  return (
    <FlatList
      data={entries}
      renderItem={({ item }) => <MediaCard editCallback={refresh} item={item.media} progress={item.progress} />}
      keyExtractor={item => item.media.id.toString()}
      getItemLayout={(_, index) => ({
        index,
        length: 250,
        offset: index * 250,
      })}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<MediaCategories type={type} />}
      overScrollMode="never"
    />
  );
};

const LibraryPageSuspense = ({
  route: {
    params: { userId, type },
  },
}: BottomTabScreenProps<LibraryPageParamList, "Anime" | "Manga">) => {
  const [libraryReader, libraryUpdater] = usePromise(getEntries, userId, type);

  const refresh = () => {
    libraryUpdater(userId, type);
  };

  return (
    <Suspense fallback={<Loading />}>
      <LibraryPage libraryReader={libraryReader} refresh={refresh} type={type} />
    </Suspense>
  );
};

export default LibraryPageSuspense;
