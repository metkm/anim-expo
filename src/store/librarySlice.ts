import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaListObject, MediaType } from "../api/objectTypes";

interface InitialState {
  ANIME: MediaListObject[];
  MANGA: MediaListObject[];
}

const initialState: InitialState = {
  ANIME: [],
  MANGA: [],
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addMedia: (
      state,
      { payload: { mediaList, mediaType } }: PayloadAction<{ mediaList: MediaListObject; mediaType: MediaType }>
    ) => {
      state[mediaType] = [...state[mediaType], mediaList];
    },
    removeMedia: (state, { payload: { index, mediaType } }: PayloadAction<{ index: number; mediaType: MediaType }>) => {
      state[mediaType] = [...state[mediaType].slice(index, 1)];
    },
    setMediaList: (
      state,
      { payload: { mediaList, mediaType } }: PayloadAction<{ mediaList: MediaListObject[]; mediaType: MediaType }>
    ) => {
      state[mediaType] = mediaList;
    },
  },
});

export const { addMedia, removeMedia, setMediaList } = librarySlice.actions;
export default librarySlice.reducer;
