import React from "react";
import { ScrollView } from "react-native";
import { useBrowse } from "../../hooks/useBrowse";

import BrowseRow from "../../components/Browse/BrowseRow";
import Loading from "../../components/AnimLoading";

const BrowseAnime = () => {
  const { browse } = useBrowse("ANIME");

  if (!browse) return <Loading />;
  return (
    <ScrollView style={{ paddingLeft: 6 }}>
      <BrowseRow title="Trending Now" mediaList={browse.trending.media} />
      <BrowseRow title="Popular This Season" mediaList={browse.season.media} />
      <BrowseRow title="Upcoming Next Season" mediaList={browse.nextSeason.media} />
      <BrowseRow title="All Time Popular" mediaList={browse.popular.media} />
    </ScrollView>
  )
}

export default BrowseAnime;
