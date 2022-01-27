import React, { Suspense, useState } from "react";
import { View, ViewProps } from "react-native";

import { UserObject } from "../api/objectTypes";
import { getUser } from "../api/user/getUser";

import Loading from "../components/AnimLoading";
import UserHeader from "../components/User/UserHeader";
import UserActivities from "./User/UserActivities";

import { usePromise } from "../hooks/usePromise";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { UserParamList, UserScreenProps } from "./props";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  useAnimatedProps,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { springConfig } from "../constants/reanimated";
import { useTabBarStyle } from "../hooks/useTabBarStyle";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface UserProps {
  userReader: () => UserObject;
}

const Tab = createMaterialTopTabNavigator<UserParamList>();

const SNAPPED = -380
const User = ({ userReader }: UserProps) => {
  const { sceneContainerStyle, ...tab } = useTabBarStyle();
  const { height } = useSafeAreaFrame();
  const bottomHeight = useBottomTabBarHeight();

  const [user] = useState(() => userReader());
  const offsetY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { start: number }>({
    onStart: (_, context) => {
      context.start = offsetY.value;
    },
    onActive: ({ translationY }, { start }) => {
      offsetY.value = start + translationY;
    },
    onEnd: () => {
      if (offsetY.value > SNAPPED / 4) {
        offsetY.value = 0;
      } else {
        offsetY.value = SNAPPED;
      }
    },
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(interpolate(
          offsetY.value,
          [0, SNAPPED],
          [0, SNAPPED],
          Extrapolate.CLAMP
        ), springConfig)
      },
    ],
  }), []);

  const animatedProps = useAnimatedProps<Animated.AnimateProps<ViewProps>>(() => ({
    pointerEvents: offsetY.value == SNAPPED ? "box-none": "box-only"
  }), []);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetY={[-10, 10]}>
      <Animated.View style={animatedStyle}>
        <UserHeader user={user} offsetY={offsetY} />

        <Animated.View style={{ height: height - bottomHeight }} animatedProps={animatedProps}>
          <Tab.Navigator sceneContainerStyle={sceneContainerStyle} screenOptions={{ ...tab }}>
            <Tab.Screen name="Activities">{() => <UserActivities userId={user.id} />}</Tab.Screen>
          </Tab.Navigator>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const UserSuspense = ({
  route: {
    params: { userId },
  },
}: UserScreenProps) => {
  const [userReader] = usePromise(getUser, userId);

  return (
    <Suspense fallback={<Loading />}>
      <User userReader={userReader} />
    </Suspense>
  );
};

export default UserSuspense;
