import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenSlice {
  accessToken: string;
}

const initialState: TokenSlice = {
  accessToken: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`;
    },
    removeTokens: (state) => {
      state.accessToken = "";
      delete axios.defaults.headers.common["Authorization"];
    }
  },
});

export const { setAccessToken, removeTokens } = tokenSlice.actions;
export default tokenSlice.reducer;
