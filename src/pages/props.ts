import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { MediaType } from "../api/objectTypes";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

export type LibraryPageParamList = {
  Anime: {
    userId: number;
    type: MediaType;
  };
  Manga: {
    userId: number;
    type: MediaType;
  };
};

export type LibraryParamList = {
  Anime: {
    userId: number;
    padd?: boolean;
  };
  Manga: {
    userId: number;
    padd?: boolean;
  };
};

export type LibraryScreenProps = BottomTabScreenProps<LibraryParamList, "Anime" | "Manga">;
export type LibraryPageScreenProps = BottomTabScreenProps<LibraryPageParamList, "Anime" | "Manga">;

/////

export type BrowseParamList = {
  Anime: {
    type: MediaType;
  },
  Manga: {
    type: MediaType;
  }
}

export type BrowseScreenProps = BottomTabScreenProps<BrowseParamList, "Anime" | "Manga">;

export type BottomTabParamList = {
  Browse: NavigatorScreenParams<BrowseParamList>;
  Library: NavigatorScreenParams<LibraryPageParamList>;
  User: {
    userId: number;
  };
};

/////

export type UserParamList = {
  Activities: {
    userId: number;
  },
  Library: {
    userId: number;
    padd?: boolean;
  }
}

export type UserActivitiesScreenProps = MaterialTopTabScreenProps<UserParamList, "Activities">;
export type UserScreenProps = BottomTabScreenProps<BottomTabParamList, "User">;

////

export type StackParamList = {
  Home: NavigatorScreenParams<BottomTabParamList>;
  Settings: undefined;
  Notifications: undefined;
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
    activityId: number;
  };
};

export type CharacterNavigationProps = StackNavigationProp<StackParamList, "Character">;
export type ActivityNavigationProps = StackNavigationProp<StackParamList, "Activity">;
export type MediaNavigationProps = StackNavigationProp<StackParamList, "Media">;
export type UserNavigationProps = StackNavigationProp<StackParamList, "User">;

export type StackNavigationProps<T extends keyof StackParamList> = StackNavigationProp<StackParamList, T>;

export type ActivityScreenProps = StackScreenProps<StackParamList, "Activity">;
export type CharacterScreenProps = StackScreenProps<StackParamList, "Character">;
