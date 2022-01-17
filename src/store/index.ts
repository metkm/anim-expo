import { combineReducers, configureStore } from "@reduxjs/toolkit";

import animeCategoriesReducer from "./animeCategoriesSlice";
import mangaCategoriesReducer from "./mangaCategoriesSlice";

import tokenReducer from "./tokenSlice";
import userReducer from "./userSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  animeCategories: animeCategoriesReducer,
  mangaCategories: mangaCategoriesReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
