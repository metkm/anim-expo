import React from "react";
import { useColors } from "../../hooks/useColors";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { LibraryParamList } from "../pageProps";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LibraryPage from "./LibraryPage";

const Tab = createMaterialTopTabNavigator();

const Library = ({
  route: {
    params,
  },
}: BottomTabScreenProps<LibraryParamList, "Anime" | "Manga">) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { width } = useSafeAreaFrame();
  const { top } = useSafeAreaInsets();
  const { color } = useColors();
  const tabWidth = width / 2 - 10;
  const indicatorWidth = 60;

  return (
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
      <Tab.Screen name="Anime" component={LibraryPage} initialParams={{ userId: user?.id || params.userId, type: "ANIME" }} />
      <Tab.Screen name="Manga" component={LibraryPage} initialParams={{ userId: user?.id || params.userId, type: "MANGA" }} />
    </Tab.Navigator>
  );
};

export default Library;
