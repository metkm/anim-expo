import { PortalProvider } from "@gorhom/portal";
import { ScrollView } from "react-native";
import Loading from "../../components/AnimLoading";
import BrowseRow from "../../components/Browse/BrowseRow";

import { useBrowse } from "../../hooks/useBrowse";
import { BrowsePageScreenProps } from "../props";

const labels: {[key: string]: string} = {
  "trending": "Trending now",
  "popular": "All Time Popular",
  "manhwa": "Popular Manhwa",
  "season": "Popular This Season",
  "nextSeason": "Upcoming Next Season",
}

const BrowsePage = ({
  route: {
    params: { type },
  },
}: BrowsePageScreenProps<"Anime" | "Manga">) => {
  const { browse } = useBrowse(type);

  if (!browse) return <Loading />;
  return (
    <PortalProvider>
      <ScrollView>
        {
          Object.entries(browse).map(([key, value], index) => {
            return <BrowseRow key={index} title={labels[key]} mediaList={value.media} />
          })
        }
      </ScrollView>
    </PortalProvider>
  );
};

export default BrowsePage;
