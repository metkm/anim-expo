import { Suspense, useEffect, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { LibraryPageScreenProps } from "../props";

import { MediaListCollectionObject, MediaListObject, MediaType } from "../../api/objectTypes";
import { getEntries } from "../../api/library/getEntries";
import { usePromise } from "../../hooks/usePromise";

import Loading from "../../components/AnimLoading";
import MediaCard from "../../components/Media/MediaCard";
import MediaCategories from "../../components/Media/MediaCategories";

import { useAppDispatch, useAppSelector } from "../../store";
import { setMediaList } from "../../store/librarySlice";
import { setCategories } from "../../store/categoriesSlice";

interface LibraryPageProps {
  libraryReader: () => MediaListCollectionObject;
  type: MediaType;
}

const LibraryPage = ({ libraryReader, type }: LibraryPageProps) => {
  const [listCollection] = useState(() => libraryReader());
  const entries = useAppSelector(state => state.library[type]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let foundCategories = listCollection.lists.map(list => list.name);
    let foundEntries = listCollection.lists.find(list => list.name == foundCategories[0])?.entries;

    if (!foundEntries) return;
    dispatch(setMediaList({ mediaList: foundEntries, mediaType: type }));
    dispatch(setCategories({ categories: foundCategories, type: type }));
  }, []);

  console.log("librarypage render");
  const renderItem: ListRenderItem<MediaListObject> = ({ item }) => (
    <MediaCard item={item.media} progress={item.progress} />
  );

  return (
    <FlatList
      data={entries}
      renderItem={renderItem}
      keyExtractor={item => `${item.media.id}`}
      ListHeaderComponent={<MediaCategories type={type} />}
      numColumns={2}
    />
  );

  // const [listCollection] = useState(() => libraryReader());
  // const [categories, setCategories] = useState(() => listCollection.lists.map(list => list.name));
  // const entries = listCollection.lists.find(list => list.name == categories[0])?.entries;

  // const keyExtractor = (item: MediaListObject) => (
  //   item.media.id.toString()
  // )

  // const renderItem: ListRenderItem<MediaListObject> = ({ item }) => (
  //   <MediaCard item={item.media} progress={item.progress} editCallback={refresh} />
  // )

  // return (
  //   <FlatList
  //     data={entries}
  //     renderItem={renderItem}
  //     keyExtractor={keyExtractor}
  //     ListHeaderComponent={<MediaCategories categories={categories} onCategories={setCategories} />}
  //     numColumns={2}
  //   />
  // )
};

const LibraryPageSuspense = ({
  route: {
    params: { type, userId },
  },
}: LibraryPageScreenProps<"Anime" | "Manga">) => {
  const [libraryReader, setLibraryUpdater] = usePromise(getEntries, userId, type);

  return (
    <Suspense fallback={<Loading />}>
      <LibraryPage libraryReader={libraryReader} type={type} />
    </Suspense>
  );
};

export default LibraryPageSuspense;
