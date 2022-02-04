import { Suspense, useState } from "react";
import { ListRenderItem, FlatList } from "react-native";
import { LibraryPageScreenProps } from "../props";

import { MediaListCollectionObject, MediaListObject } from "../../api/objectTypes";
import { getEntries } from "../../api/library/getEntries";
import { usePromise } from "../../hooks/usePromise";

import Loading from "../../components/AnimLoading";
import MediaCard from "../../components/Media/MediaCard";
import MediaCategories from "../../components/Media/MediaCategories";

interface LibraryPageProps {
  libraryReader: () => MediaListCollectionObject;
  refresh: () => void;
}

const LibraryPage = ({ libraryReader, refresh }: LibraryPageProps) => {
  const [listCollection] = useState(() => libraryReader());
  const [categories, setCategories] = useState(() => listCollection.lists.map(list => list.name));
  const entries = listCollection.lists.find(list => list.name == categories[0])?.entries;

  const keyExtractor = (item: MediaListObject) => item.media.id.toString();

  const renderItem: ListRenderItem<MediaListObject> = ({ item }) => (
    <MediaCard item={item.media} progress={item.progress} editCallback={refresh} />
  );

  return (
    <FlatList
      data={entries}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={<MediaCategories categories={categories} onCategories={setCategories} />}
      numColumns={2}
    />
  );
};

const LibraryPageSuspense = ({
  route: {
    params: { type, userId },
  },
}: LibraryPageScreenProps<"Anime" | "Manga">) => {
  const [libraryReader, setLibraryUpdater] = usePromise(getEntries, userId, type);

  const refresh = () => {
    setLibraryUpdater(userId, type);
  };

  return (
    <Suspense fallback={<Loading />}>
      <LibraryPage libraryReader={libraryReader} refresh={refresh} />
    </Suspense>
  );
};

export default LibraryPageSuspense;
