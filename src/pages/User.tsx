import React, { Suspense, useState } from "react";
import { ViewProps } from "react-native";

import { UserObject } from "../api/objectTypes";
import { getUser } from "../api/user/getUser";

import Loading from "../components/AnimLoading";
import UserHeader from "../components/User/UserHeader";
import UserActivities from "../components/User/UserActivities";
import Library from "./Library/Library";

import { usePromise } from "../hooks/usePromise";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { HomeScreenProps } from "./props";
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

import { useSelector } from "react-redux";
import { RootState } from "../store";

interface UserProps {
  userReader: () => UserObject;
}

const Tab = createMaterialTopTabNavigator();

const SNAPPED = -380 - 10; // 20 extra margin
const User = ({ userReader }: UserProps) => {
  const { ...tab } = useTabBarStyle();
  const { height } = useSafeAreaFrame();

  const storeUser = useSelector((state: RootState) => state.user.user);
  const [user] = useState(() => userReader());
  const offsetY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { start: number }>(
    {
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
    },
    []
  );

  const animatedStyle = useAnimatedStyle(
    () => ({
      flex: 1,
      transform: [
        {
          translateY: withSpring(
            interpolate(offsetY.value, [0, SNAPPED], [0, SNAPPED], Extrapolate.EXTEND),
            springConfig
          ),
        },
      ],
    }),
    []
  );

  const animatedProps = useAnimatedProps<Animated.AnimateProps<ViewProps>>(
    () => ({
      pointerEvents: offsetY.value == SNAPPED ? "auto" : "box-only",
    }),
    []
  );

  if (storeUser?.id == user.id) {
    return (
      <UserActivities userId={user.id} header={<UserHeader user={user} />} />
    );
  }

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetY={[-10, 10]}>
      <Animated.View style={animatedStyle}>
        <UserHeader user={user} />

        <Animated.View style={{ height }} animatedProps={animatedProps}>
          <Tab.Navigator screenOptions={{ ...tab }}>
            <Tab.Screen name="Activities">{() => <UserActivities userId={user.id}  />}</Tab.Screen>
            <Tab.Screen name="Library" component={Library} initialParams={{ userId: user.id, padd: false }} />
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
}: HomeScreenProps<"User">) => {
  const [userReader] = usePromise(getUser, userId);

  return (
    <Suspense fallback={<Loading />}>
      <User userReader={userReader} />
    </Suspense>
  );
};

export default UserSuspense;
