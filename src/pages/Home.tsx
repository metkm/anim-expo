import React, { useEffect } from "react";
import axios from "axios";

import { HomeTabParamList } from "./props";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PortalProvider } from "@gorhom/portal";

import { RootState } from "../store";
import { asyncLogin } from "../store/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useColors } from "../hooks/useColors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Browse from "./Browse/Browse";
import Library from "./Library/Library";
import Login from "./Login";
import User from "./User";

const Tab = createBottomTabNavigator<HomeTabParamList>();

interface Icons {
  [index: string]: string;
}

const Home = () => {
  const accessToken = useSelector((state: RootState) => state.token.accessToken);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const { color } = useColors();

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(asyncLogin());
    }
  }, [accessToken]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Icons = {
            User: "account-outline",
            Library: "book-outline",
            Browse: "compass-outline",
            Login: "login-outline",
          };

          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: color,
      })}
    >
      <Tab.Screen name="Browse" component={Browse} />
      {user ? (
        <>
          <Tab.Screen name="Library" component={Library} initialParams={{ userId: user.id }} />
          <Tab.Screen name="User" component={User} initialParams={{ userId: user.id }} />
        </>
      ) : (
        <Tab.Screen name="Login" component={Login} />
      )}
    </Tab.Navigator>
  );
};

export default Home;
