import React from "react";
import { StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BrowseAnime from "./BrowseAnime";
import BrowseManga from "./BrowseManga";

import { useColors } from "../../hooks/useColors";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const Browse = () => {
  const { color } = useColors();
  const { width } = useSafeAreaFrame();
  const tabWidth = width / 2 - 10;
  const indicatorWidth = 60;

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            left: 10,
            right: 10,
            top: 10 + StatusBar.currentHeight!,
            borderRadius: 10,
            overflow: "hidden",
          },
          tabBarIndicatorStyle: {
            backgroundColor: color,
            width: indicatorWidth,
            left: (tabWidth - indicatorWidth) / 2,
            borderRadius: 1000,
          },
        }}
        sceneContainerStyle={{ paddingTop: 10 + StatusBar.currentHeight! + 44 }}
      >
        <Tab.Screen name="Anime" component={BrowseAnime} />
        <Tab.Screen name="Manga" component={BrowseManga} />
      </Tab.Navigator>
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Browse;
