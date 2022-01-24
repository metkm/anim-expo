import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BrowseAnime from "./BrowseAnime";
import BrowseManga from "./BrowseManga";
import { useTabBarStyle } from "../shared";

const Tab = createMaterialTopTabNavigator();

const Browse = () => {
  const { tabBarIndicatorStyle, tabBarStyle, sceneContainerStyle } = useTabBarStyle();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle,
          tabBarIndicatorStyle,
        }}
        sceneContainerStyle={sceneContainerStyle}
      >
        <Tab.Screen name="Anime" component={BrowseAnime} />
        <Tab.Screen name="Manga" component={BrowseManga} />
      </Tab.Navigator>
    </>
  );
};

export default Browse;
