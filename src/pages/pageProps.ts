import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ActivityUnion, MediaType } from "../api/objectTypes";

export type LibraryPageParamList = {
  Anime: {
    userId: number;
    type: MediaType;
    category: string;
  };
  Manga: {
    userId: number;
    type: MediaType;
    category: string;
  };
};

export type LibraryParamList = {
  Anime: {
    userId?: number;
  };
  Manga: {
    userId?: number;
  };
};

export type BottomTabParamList = {
  Discover: undefined;
  Library: NavigatorScreenParams<LibraryPageParamList>;
  User: {
    userId: number;
  };
};

export type StackParamList = {
  Home: NavigatorScreenParams<BottomTabParamList>;
  Settings: undefined;
  Media: {
    mediaId: number;
  };
  User: {
    userId: number;
  };
  Character: {
    characterId: number;
  };
  Activity: {
    activity: ActivityUnion;
  };
};

export type CharacterNavigationProps = StackNavigationProp<StackParamList, "Character">;
export type SettingsNavigationProps = StackNavigationProp<StackParamList, "Settings">;
export type ActivityNavigationProps = StackNavigationProp<StackParamList, "Activity">;
export type MediaNavigationProps = StackNavigationProp<StackParamList, "Media">;
export type UserNavigationProps = StackNavigationProp<StackParamList, "User">;


export type UserScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, "User">,
  BottomTabScreenProps<BottomTabParamList>
>;

export type ActivityScreenProps = StackScreenProps<StackParamList, "Activity">;
export type CharacterScreenProps = StackScreenProps<StackParamList, "Character">;

