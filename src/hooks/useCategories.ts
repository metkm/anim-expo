import { MediaType } from "../api/objectTypes";

import { useSelector } from "react-redux";
import { RootState } from "../store";

import { setCategories as animeSetCategories } from "../store/animeCategoriesSlice";
import { setCategories as mangaSetCategories } from "../store/mangaCategoriesSlice";

export const useCategories = (type: MediaType) => {
  const categories =
    type == "ANIME"
      ? useSelector((state: RootState) => state.animeCategories.categories)
      : useSelector((state: RootState) => state.mangaCategories.categories);

  const setCategories = type == "ANIME" ? animeSetCategories : mangaSetCategories;

  return {
    categories,
    setCategories
  }
}
