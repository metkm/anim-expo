import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  categories: ["Watching", "Completed", "Paused", "Dropped", "Planning"]
}

export const animeCategorySlice = createSlice({
  name: "animeCategories",
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

export const { setCategories, setCategory } = animeCategorySlice.actions;
export default animeCategorySlice.reducer;
