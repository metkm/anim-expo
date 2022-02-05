import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreenProps, LibraryPageParamList } from "../props";

import { useTabBarStyle } from "../../hooks/useTabBarStyle";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import LibraryPage from "./LibraryPage";
import { PortalProvider } from "@gorhom/portal";

const Tab = createMaterialTopTabNavigator<LibraryPageParamList>();

const Library = ({
  route: {
    params: { userId, padd },
  },
}: HomeScreenProps<"Library">) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { tabBarIndicatorStyle, tabBarStyle } = useTabBarStyle(padd); 

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: tabBarStyle,
        tabBarIndicatorStyle: tabBarIndicatorStyle,
        lazy: true
      }}
    >
      <Tab.Screen name="Anime" component={LibraryPage} initialParams={{ userId: userId || user?.id, type: "ANIME" }} />
      <Tab.Screen name="Manga" component={LibraryPage} initialParams={{ userId: userId || user?.id, type: "MANGA" }} />
    </Tab.Navigator>
  );
};

export default Library;
