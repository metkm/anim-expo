import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LibraryScreenProps } from "../props";

import { useTabBarStyle } from "../../hooks/useTabBarStyle";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import LibraryPage from "./LibraryPage";

const Tab = createMaterialTopTabNavigator();

const Library = ({
  route: {
    params,
  },
}: LibraryScreenProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { sceneContainerStyle, tabBarIndicatorStyle, tabBarStyle } = useTabBarStyle();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: tabBarStyle,
        tabBarIndicatorStyle: tabBarIndicatorStyle,
      }}
      sceneContainerStyle={sceneContainerStyle}
    >
      <Tab.Screen name="Anime" component={LibraryPage} initialParams={{ userId: user?.id || params.userId, type: "ANIME" }} />
      <Tab.Screen name="Manga" component={LibraryPage} initialParams={{ userId: user?.id || params.userId, type: "MANGA" }} />
    </Tab.Navigator>
  );
};

export default Library;
