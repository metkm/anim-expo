import "react-native-gesture-handler";
import "react-native-reanimated";

import React, { useEffect } from "react";
import axios from "axios";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useColorScheme, StatusBar, Keyboard, Dimensions } from "react-native";
import { Overpass_400Regular, Overpass_700Bold, useFonts } from "@expo-google-fonts/overpass";
import AppLoading from "expo-app-loading";

import { Provider, useSelector, useDispatch } from "react-redux";
import { store, persistor, RootState } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { asyncLogin } from "./src/store/userSlice";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import Media from "./src/pages/Media";
import User from "./src/pages/User";
import Settings from "./src/pages/Settings";
import Library from "./src/pages/Library/Library";
import Browse from "./src/pages/Browse/Browse";
import { timingConfig } from "./src/constants/reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { animDark, animLight } from "./src/constants/theme";
import { useColors } from "./src/hooks/useColors";
import Character from "./src/pages/Character";
import Login from "./src/pages/Login";

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
  const screenHeight = useSharedValue(Dimensions.get("screen").height);

  const isDark = useColorScheme() == "dark";
  let [fontsLoaded] = useFonts({
    Overpass_400Regular,
    Overpass_700Bold,
  });

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(screenHeight.value, timingConfig),
      backgroundColor: "black",
    };
  });

  useEffect(() => {
    const didShowListener = Keyboard.addListener("keyboardDidShow", event => {
      screenHeight.value = event.endCoordinates.screenY;
    });

    const didHideListener = Keyboard.addListener("keyboardDidHide", event => {
      screenHeight.value = event.endCoordinates.screenY;
    });

    return () => {
      didShowListener.remove();
      didHideListener.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Animated.View style={animatedViewStyle}>
          <NavigationContainer theme={isDark ? animDark : animLight}>
            <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Media" component={Media} options={{ headerTransparent: true, headerTitle: "" }} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen
                name="Character"
                component={Character}
                options={{ headerTransparent: true, headerTitle: "" }}
              />

              <Stack.Screen
                name="User"
                component={User}
                options={{ headerTransparent: true, headerShadowVisible: false, headerTitle: "" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Animated.View>
      </PersistGate>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? "light-content" : "dark-content"} />
    </Provider>
  );
};

export default App;
