import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MediaType } from "../types";

export type LibraryParamList = {
  Anime: {
    userId: number,
    type: MediaType,
    category: string,
  },
  Manga: {
    userId: number,
    type: MediaType,
    category: string,
  }
}

export type BottomTabParamList = {
  Discover: undefined,
  Library: NavigatorScreenParams<LibraryParamList>,
  User: {
    userId?: number
  }
}

export type StackParamList = {
  Home: NavigatorScreenParams<BottomTabParamList>,
  Settings: undefined,
  Media: {
    mediaId: number
  },
  User: {
    userId: number
  },
}

export type MediaNavigationProps = StackNavigationProp<StackParamList, "Media">;
export type SettingsNavigationProps = StackNavigationProp<StackParamList, "Settings">;

export type UserScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "User">,
  BottomTabScreenProps<BottomTabParamList>
>;
