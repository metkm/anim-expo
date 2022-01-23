import React from "react";
import { StatusBar } from "expo-status-bar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import BrowseAnime from "./BrowseAnime";
import BrowseManga from "./BrowseManga";

import { useColors } from "../../hooks/useColors";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const Browse = () => {
  const { color } = useColors();
  const { top } = useSafeAreaInsets();
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
            top: 10 + top,
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
        sceneContainerStyle={{ paddingTop: 10 + top + 44 }}
      >
        <Tab.Screen name="Anime" component={BrowseAnime} />
        <Tab.Screen name="Manga" component={BrowseManga} />
      </Tab.Navigator>
      <StatusBar translucent backgroundColor="transparent" style="auto" />
    </>
  );
};

export default Browse;
