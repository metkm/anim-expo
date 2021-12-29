import React from "react";
import { StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BrowseAnime from "./BrowseAnime";
import BrowseManga from "./BrowseManga";
import { useColors } from "../../hooks/useColors";

const Tab = createMaterialTopTabNavigator();

const Browse = () => {
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
      <Tab.Screen name="Anime" component={BrowseAnime} />
      <Tab.Screen name="Manga" component={BrowseManga} />
    </Tab.Navigator>
  );
};

export default Browse;
