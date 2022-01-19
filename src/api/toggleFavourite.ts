import axios from "axios";
import { FavouritesObject } from "./objectTypes";

const toggleFavouriteQuery = `mutation($animeId: Int, $mangaId: Int, $characterId: Int, $staffId: Int, $studioId: Int) {
  ToggleFavourite(animeId: $animeId, mangaId: $mangaId, characterId: $characterId, staffId: $staffId, studioId: $studioId) {
    anime {
      pageInfo {
        total
      }
    }
    manga {
      pageInfo {
        total
      }
    }
    characters {
      pageInfo {
        total
      }
    }
    staff {
      pageInfo {
        total
      }
    }
    studios {
      pageInfo {
        total
      }
    }
  }
}`;

interface ToggleFavouriteResponse {
  data: {
    ToggleFavourite: FavouritesObject;
  };
}

export const toggleFavourite = async (variables: { [key: string]: number }) => {
  const resp = await axios.post<ToggleFavouriteResponse>("/", {
    query: toggleFavouriteQuery,
    variables
  });

  return resp.data.data.ToggleFavourite;
};
