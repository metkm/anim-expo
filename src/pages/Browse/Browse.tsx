import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTabBarStyle } from "../../hooks/useTabBarStyle";
import BrowsePage from "./BrowsePage";

const Tab = createMaterialTopTabNavigator();

const Browse = () => {
  const { tabBarIndicatorStyle, tabBarStyle, sceneContainerStyle } = useTabBarStyle();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle,
        tabBarIndicatorStyle,
      }}
      sceneContainerStyle={sceneContainerStyle}
    >
      <Tab.Screen name="Anime" component={BrowsePage} initialParams={{ type: "ANIME" }} />
      <Tab.Screen name="Manga" component={BrowsePage} initialParams={{ type: "MANGA" }} />
    </Tab.Navigator>
  );
};

export default Browse;
