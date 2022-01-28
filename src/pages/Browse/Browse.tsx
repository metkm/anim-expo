import React from "react";
import BrowsePage from "./BrowsePage";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTabBarStyle } from "../../hooks/useTabBarStyle";

const Tab = createMaterialTopTabNavigator();

const Browse = () => {
  const { tabBarIndicatorStyle, tabBarStyle } = useTabBarStyle();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle,
        tabBarIndicatorStyle,
      }}
    >
      <Tab.Screen name="Anime" component={BrowsePage} initialParams={{ type: "ANIME" }} />
      <Tab.Screen name="Manga" component={BrowsePage} initialParams={{ type: "MANGA" }} />
    </Tab.Navigator>
  );
};

export default Browse;
