import { memo, useRef } from "react";
import { StyleSheet, ViewProps, View, Animated, ViewStyle } from "react-native";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
// import {
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { springConfig } from "../constants/reanimated";

interface AnimSwipeableProps extends ViewProps {
  children: JSX.Element;
  options: () => JSX.Element;
}

const AnimSwipeable = ({ children, options, ...rest }: AnimSwipeableProps) => {
  const { width } = useSafeAreaFrame();
  const x = useRef(new Animated.Value(0)).current;

  const gestureHandler = Animated.event(
    [
      {
        nativeEvent: {
          translationX: x,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const gestureHandlerChange = ({
    nativeEvent: { translationX },
  }: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (Math.abs(translationX) > width / 3) {
      Animated.spring(x, {
        toValue: -(width / 3),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(x, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    flex: 1,
    transform: [
      {
        translateX: x,
      },
    ],
  };

  return (
    <View style={style.container}>
      <PanGestureHandler
        onHandlerStateChange={gestureHandlerChange}
        onGestureEvent={gestureHandler}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View style={[animatedStyle, { ...(rest.style as {}) }]}>{children}</Animated.View>
      </PanGestureHandler>

      <Animated.View style={[style.options, { width: width / 3 - 10 }]}>{options()}</Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  options: {
    position: "absolute",
    top: 3,
    right: 5,
    bottom: 3,
    zIndex: -10,
    borderRadius: 4,
    overflow: "hidden",
  },
});

export default memo(AnimSwipeable);
