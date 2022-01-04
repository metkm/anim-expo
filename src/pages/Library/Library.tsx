import React from "react";
import { StatusBar } from "react-native";
import { useColors } from "../../hooks/useColors";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { LibraryParamList } from "../pageProps";
import LibraryPage from "./LibraryPage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Tab = createMaterialTopTabNavigator();

const Library = ({
  route: {
    params,
  },
}: BottomTabScreenProps<LibraryParamList, "Anime" | "Manga">) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { color } = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: StatusBar.currentHeight,
        },
        tabBarIndicatorStyle: {
          backgroundColor: color,
        },
      }}
    >
      <Tab.Screen name="Anime" component={LibraryPage} initialParams={{ userId: user?.id || params.userId, type: "ANIME" }} />
      <Tab.Screen name="Manga" component={LibraryPage} initialParams={{ userId: user?.id || params.userId, type: "MANGA" }} />
    </Tab.Navigator>
  );
};

export default Library;
