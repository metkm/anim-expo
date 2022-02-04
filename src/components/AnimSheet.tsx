import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { forwardRef, memo, useImperativeHandle } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { FullWindowOverlay } from "react-native-screens";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { springConfig } from "../constants/reanimated";
import { AnimSheetHandle } from "./types";

import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useColors } from "../hooks/useColors";
import { Portal } from "@gorhom/portal";

const AnimSheet = forwardRef<AnimSheetHandle, ViewProps>(({ children }, ref) => {
  const { colors, color } = useColors();
  const { height } = useSafeAreaFrame();

  try {
    var bottomHeight = useBottomTabBarHeight();
  } catch {
    var bottomHeight = 0;
  }

  const COLLAPSED = height - bottomHeight - 26;
  const EXPANDED = height / 3;
  const top = useSharedValue(COLLAPSED);

  useImperativeHandle(ref, () => ({
    toggle: () => {
      top.value = top.value == COLLAPSED ? EXPANDED : COLLAPSED;
    },
  }));

  const onGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { start: number }>(
    {
      onStart: (_, context) => {
        context.start = top.value;
      },
      onActive: ({ translationY }, { start }) => {
        top.value = translationY + start;
      },
      onEnd: () => {
        (top.value = top.value > EXPANDED / 2 + 300 ? COLLAPSED : EXPANDED), springConfig;
      },
    },
    []
  );

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: colors.background,
      top: withSpring(top.value, springConfig),
      bottom: bottomHeight,
    }),
    []
  );

  return (
    <Portal>
      <PanGestureHandler onGestureEvent={onGesture}>
        <Animated.View style={[animatedStyle, style.container]}>
          <View style={[style.line, { backgroundColor: color }]} />

          {children}
        </Animated.View>
      </PanGestureHandler>
    </Portal>
  );
});

const style = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  line: {
    width: "20%",
    height: 6,
    marginVertical: 10,
    borderRadius: 1000,
  },
});

export default memo(AnimSheet);
