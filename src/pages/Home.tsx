import React, { useEffect } from "react";
import axios from "axios";

import { HomeTabParamList } from "./props";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootState } from "../store";
import { asyncLogin } from "../store/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useColors } from "../hooks/useColors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Browse from "./Browse/Browse";
import Library from "./Library/Library";
import Login from "./Login";
import User from "./User";
import AnimTabButton from "../components/AnimTabButton";

const Tab = createBottomTabNavigator<HomeTabParamList>();

interface Icons {
  [index: string]: string;
  User: string;
  Library: string;
  Browse: string;
  Login: string;
}

const focusedIcons: Icons = {
  User: "account",
  Library: "book",
  Browse: "compass",
  Login: "login",
}

const unFocusedIcons: Icons = {
  User: "account-outline",
  Library: "book-outline",
  Browse: "compass-outline",
  Login: "login-outline",
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
        tabBarIcon: ({ color, size, focused }) => {
          const icon = focused ? focusedIcons[route.name] : unFocusedIcons[route.name];
          return <Icon name={icon} size={size} color={color} />;
        },
        tabBarButton: AnimTabButton,
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
