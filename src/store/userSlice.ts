import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserObject } from "../api/objectTypes";

export const viewerQuery = `{
  Viewer {
    id
    name
    bannerImage
    options {
      profileColor
    }
    avatar {
      large
    }
    statistics {
      anime {
        count
        minutesWatched
        meanScore
      }
      manga {
        count
        chaptersRead
        meanScore
      }
    }
  }
}`;

export interface ViewerResponse {
  data: {
    Viewer: UserObject;
  };
}

export interface UserState {
  user: UserObject | null;
}

const initialState: UserState = {
  user: null,
};

export const asyncLogin = createAsyncThunk("user/login", async () => {
  const resp = await axios.post<ViewerResponse>("/", {
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
    builder.addCase(asyncLogin.rejected, (state, action) => {
      console.log(action.error);
    })
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
