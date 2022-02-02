import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaType } from "../api/objectTypes";

interface InitialState {
  [key: string]: string[];
}

const initialState: InitialState = {
  ANIME: [],
  MANGA: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (
      state,
      { payload: { categories, type } }: PayloadAction<{ categories: string[]; type: MediaType }>
    ) => {
      state[type] = categories;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
