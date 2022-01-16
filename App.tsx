import "react-native-gesture-handler";
import "react-native-reanimated";

import React, { useEffect } from "react";
import axios from "axios";
import { useColorScheme, StatusBar } from "react-native";
import { Overpass_400Regular, Overpass_700Bold, useFonts } from "@expo-google-fonts/overpass";
import AppLoading from "expo-app-loading";

import { Provider, useSelector, useDispatch } from "react-redux";
import { store, persistor, RootState } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { asyncLogin } from "./src/store/userSlice";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import Character from "./src/pages/Character";
import Activity from "./src/pages/Activity";
import Settings from "./src/pages/Settings";
import Library from "./src/pages/Library/Library";
import Browse from "./src/pages/Browse/Browse";
import Login from "./src/pages/Login";
import Media from "./src/pages/Media";
import User from "./src/pages/User";

import { animDark, animLight } from "./src/constants/theme";
import { useColors } from "./src/hooks/useColors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

axios.defaults.baseURL = "https://graphql.anilist.co";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
            User: "account",
            Library: "book",
            Discover: "compass",
            Login: "login",
          };

          return <Icon name={icons[route.name]} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: color,
      })}
    >
      <Tab.Screen name="Discover" component={Browse} />
      {user && <Tab.Screen name="Library" component={Library} />}
      {user ? (
        <Tab.Screen name="User" component={User} initialParams={{ userId: user.id }} />
      ) : (
        <Tab.Screen name="Login" component={Login} />
      )}
    </Tab.Navigator>
  );
};

const App = () => {
  const isDark = useColorScheme() == "dark";
  let [fontsLoaded] = useFonts({
    Overpass_400Regular,
    Overpass_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer theme={isDark ? animDark : animLight}>
          <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Media" component={Media} options={{ headerTransparent: true, headerTitle: "" }} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen
              name="Character"
              component={Character}
              options={{ headerTransparent: true, title: "" }}
            />

            <Stack.Screen 
              name="Activity"
              component={Activity}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="User"
              component={User}
              options={{ headerShown: false, headerShadowVisible: false, title: "" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? "light-content" : "dark-content"} />
    </Provider>
  );
};

export default App;
