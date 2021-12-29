import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserObject, ResponseViewer } from "../types";
import viewerQuery from "../graphql/queries/viewerQuery";

export interface UserState {
  user: UserObject | null;
}

const initialState: UserState = {
  user: null,
};

export const asyncLogin = createAsyncThunk("user/login", async () => {
  const resp = await axios.post<ResponseViewer>("/", {
    query: viewerQuery,
  });

  return resp.data.data.Viewer;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
