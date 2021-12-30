import axios from "axios";
import { BrowseAnimeQuery } from "../../graphql/queries/browse/BrowseAnimeQuery";
import { BrowseMangaQuery } from "../../graphql/queries/browse/BrowseMangaQuery";
import { season, nextSeason, seasonYear, nextYear } from "../../timeInfo";

export const getBrowse = async <T>(mediaType: string) => {
  const query = mediaType == "ANIME" ? BrowseAnimeQuery : BrowseMangaQuery;

  const resp = await axios.post<{ data: T }>("/", {
    query,
    variables: {
      season,
      nextSeason,
      seasonYear,
      nextYear
    }
  });

  return resp.data.data;
}
