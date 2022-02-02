import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Dimensions, StyleSheet, View, ViewProps } from "react-native";

import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { springConfig } from "../constants/reanimated";

import { useColors } from "../hooks/useColors";

const height = Dimensions.get("screen").height;

const AnimSheet = ({ children }: ViewProps) => {
  const { colors, color } = useColors();
  
  try {
    var bottomHeight = useBottomTabBarHeight();
  } catch {
    bottomHeight = 100;
  }

  const COLLAPSED = height - bottomHeight - 26;
  const EXPANDED = height / 3;
  const top = useSharedValue(COLLAPSED);

  const onGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { start: number }>({
    onStart: (_, context) => {
      context.start = top.value;
    },
    onActive: ({ translationY }, { start }) => {
      top.value = translationY + start;
    },
    onEnd: () => {
      if (top.value > EXPANDED / 2 + 300) {
        top.value = COLLAPSED;
      } else {
        top.value = EXPANDED;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.background,
    top: withSpring(top.value, springConfig),
  }));

  return (
    <PanGestureHandler onGestureEvent={onGesture}>
      <Animated.View style={[animatedStyle, style.container]}>
        <View style={[style.line, { backgroundColor: color }]} />

        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    overflow: "hidden",
    padding: 10,
  },
  line: {
    width: "20%",
    height: 6,
    marginBottom: 10,
    borderRadius: 1000,
  },
});

export default AnimSheet;
