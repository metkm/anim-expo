import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { MediaType } from "../api/objectTypes";

// Shared Screens
export type UserParams = {
  userId: number;
};

// Root Navigator in App.tsx
export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  Notifications: undefined;
  Character: { characterId: number };
  Activity: { activityId: number };
  Media: { mediaId: number };
  User: UserParams;
};

// Bottom tab navigator in App.tsx, Comes after the root
export type HomeTabParamList = {
  Browse: undefined;
  Library: { userId: number; padd?: boolean };
  User: UserParams;
  Login: undefined;
};

// Nested pages inside Home Screen
type LibraryPageParams = {
  type: MediaType;
  userId: number;
};

export type LibraryPageParamList = {
  Anime: LibraryPageParams;
  Manga: LibraryPageParams;
}

type BrowsePageParams = {
  type: MediaType;
}

export type BrowsePageParamList = {
  Anime: BrowsePageParams;
  Manga: BrowsePageParams;
}

export type AppScreenProps<T extends keyof AppStackParamList> = StackScreenProps<AppStackParamList, T>;
export type HomeScreenProps<T extends keyof HomeTabParamList> = BottomTabScreenProps<HomeTabParamList, T>;
export type LibraryPageScreenProps<T extends keyof LibraryPageParamList> = BottomTabScreenProps<LibraryPageParamList, T>;
export type BrowsePageScreenProps<T extends keyof BrowsePageParamList> = BottomTabScreenProps<BrowsePageParamList, T>;

export type AppNavigationProps<T extends keyof AppStackParamList> = StackNavigationProp<AppStackParamList, T>;
export type HomeNavigationProps<T extends keyof HomeTabParamList> = BottomTabScreenProps<HomeTabParamList, T>;
