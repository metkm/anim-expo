import React from "react";
import { StatusBar } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { LibraryParamList } from "../pageProps";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

import LibraryPage from "./LibraryPage";
import { useColors } from "../../hooks/useColors";

const Tab = createMaterialTopTabNavigator();

const Library = ({ route }: BottomTabScreenProps<LibraryParamList, "Anime" | "Manga">) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { color } = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: StatusBar.currentHeight,
        },
        tabBarIndicatorStyle: {
          backgroundColor: color
        }
      }}
    >
      <Tab.Screen name="Anime" component={LibraryPage} initialParams={{ userId: user?.id || route.params.userId, type: "ANIME", category: "Watching" }} />
      <Tab.Screen name="Manga" component={LibraryPage} initialParams={{ userId: user?.id || route.params.userId, type: "MANGA", category: "Reading" }} />
    </Tab.Navigator>
  )
};

export default Library;
