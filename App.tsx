import "react-native-gesture-handler";
import "react-native-reanimated";

import React from "react";
import axios from "axios";
import { useColorScheme } from "react-native";
import { Overpass_400Regular, Overpass_700Bold, useFonts } from "@expo-google-fonts/overpass";
import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";
import Notifications from "./src/pages/Notifications";
import Character from "./src/pages/Character";
import Activity from "./src/pages/Activity";
import Settings from "./src/pages/Settings";
import Media from "./src/pages/Media";
import Home from "./src/pages/Home";
import User from "./src/pages/User";

import { animDark, animLight } from "./src/constants/theme";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppStackParamList } from "./src/pages/props";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

axios.defaults.baseURL = "https://graphql.anilist.co";

const Stack = createStackNavigator<AppStackParamList>();

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer theme={isDark ? animDark : animLight}>
              <Stack.Navigator
                screenOptions={{
                  ...TransitionPresets.SlideFromRightIOS,
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
                <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: true }} />

                <Stack.Screen name="Character" component={Character} />
                <Stack.Screen name="Activity" component={Activity} options={{ headerShown: true }} />
                <Stack.Screen
                  name="Media"
                  component={Media}
                  options={{ headerShown: true, title: "", headerTransparent: true }}
                />
                <Stack.Screen name="User" component={User} />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>

        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
