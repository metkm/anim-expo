import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { forwardRef, memo, useImperativeHandle } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

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
import { useHeaderHeight } from "@react-navigation/elements";
import { useColors } from "../hooks/useColors";

interface AnimSheetProps extends ViewProps {
  showTop?: boolean;
}

const AnimSheet = forwardRef<AnimSheetHandle, AnimSheetProps>(({ children, showTop = true }, ref) => {
  const { colors, color } = useColors();
  const { height } = useSafeAreaFrame();
  const headerHeight = useHeaderHeight();
  
  try {
    var bottomHeight = useBottomTabBarHeight();
  } catch {
    var bottomHeight = 100;
  }

  const padd = showTop ? 26 : 0;
  const COLLAPSED = showTop ? (height - bottomHeight - padd) + headerHeight : height
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
    }),
    []
  );

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <PanGestureHandler onGestureEvent={onGesture}>
        <Animated.View style={[styles.lineContainer]}>
          <View style={[styles.line, { backgroundColor: color }]} />
        </Animated.View>
      </PanGestureHandler>

       {children}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    zIndex: 10,
  },
  lineContainer: {
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  line: {
    width: "20%",
    height: 6,
    borderRadius: 100,
  },
});

export default memo(AnimSheet);
