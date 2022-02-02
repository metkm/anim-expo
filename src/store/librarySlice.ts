import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaListObject } from "../api/objectTypes";

interface InitialState {
  mediaList: MediaListObject[];
  categories: string[];
}

const initialState: InitialState = {
  mediaList: [],
  categories: [],
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addMedia: (state, action: PayloadAction<MediaListObject>) => {
      state.mediaList.push(action.payload);
    },
    removeMedia: (state, action: PayloadAction<number>) => {
      state.mediaList = [...state.mediaList.slice(action.payload, 1)];
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { addMedia, removeMedia, setCategories } = librarySlice.actions;
export default librarySlice.reducer;
