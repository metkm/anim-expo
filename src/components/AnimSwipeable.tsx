import { memo } from "react";
import { StyleSheet, ViewProps, View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { springConfig } from "../constants/reanimated";

interface AnimSwipeableProps extends ViewProps {
  children: JSX.Element;
  options: () => JSX.Element;
}

type AnimContext = {
  startX: number;
};

const AnimSwipeable = ({ children, options, ...rest }: AnimSwipeableProps) => {
  const { width } = useSafeAreaFrame();
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimContext>({
    onStart: ({ translationX }, context) => {
      context.startX = translationX;
    },
    onActive: ({ translationX }, { startX }) => {
      x.value = translationX + startX;
    },
    onEnd: () => {
      if (Math.abs(x.value) > width / 3.5) {
        x.value = -(width / 3.5);
      } else {
        x.value = 0;
      }
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(x.value, springConfig) }],
  }), []);

  return (
    <View style={{...rest.style as {}}}>
      <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetX={[-10, 10]}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </PanGestureHandler>

      <Animated.View style={[styles.options, { width: width / 3.5 - 8 }]}>{options()}</Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    position: "absolute",
    right: 5,
    top: 0,
    bottom: 0,
    zIndex: -10,
  },
});

export default memo(AnimSwipeable);
