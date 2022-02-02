import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tokenReducer from "./tokenSlice";
import userReducer from "./userSlice";
import libraryReducer from "./librarySlice";
import categoriesReducer from "./categoriesSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector,  } from "react-redux";

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  library: libraryReducer,
  categories: categoriesReducer,
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
      immutableCheck: false,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
    
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
