import React from "react";
import { ScrollView } from "react-native";
import { useBrowse } from "../../hooks/useBrowse";

import BrowseRow from "../../components/Browse/BrowseRow";
import Loading from "../../components/AnimLoading";

const BrowseAnime = () => {
  const { browse } = useBrowse("MANGA");

  if (!browse) return <Loading />;
  return (
    <ScrollView style={{ paddingLeft: 6 }} overScrollMode="never">
      <BrowseRow title="Trending Now" mediaList={browse.trending.media} />
      <BrowseRow title="All Time Popular" mediaList={browse.popular.media} />
      <BrowseRow title="Popular Manhwa" mediaList={browse.manhwa.media} />
    </ScrollView>
  )
}

export default BrowseAnime;
