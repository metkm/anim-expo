import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  categories: ["Reading", "Completed", "Paused", "Dropped", "Planning"]
}

export const mangaCategorySlice = createSlice({
  name: "mangaCategories",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  }
});

export const { setCategories, setCategory } = mangaCategorySlice.actions;
export default mangaCategorySlice.reducer;
