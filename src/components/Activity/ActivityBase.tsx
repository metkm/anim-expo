import { ImageBackgroundBase, StyleSheet, View, ViewProps } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { springConfig } from "../../constants/reanimated";

interface ActivityBaseProps extends ViewProps {
  children: JSX.Element;
}

type AnimatedGHContext = {
  startLeft: number;
};

const ActivityBase = ({ children }: ActivityBaseProps) => {
  const { width } = useSafeAreaFrame();
  const left = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    left: withSpring(left.value, springConfig)
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    width: width / 3,
    right: withSpring(interpolate(
      left.value,
      [0, -(width / 3)],
      [-(width / 3), 0],
      Extrapolate.CLAMP
    ), springConfig)
  }))

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: ({ translationX }, context) => {
      context.startLeft = translationX;
    },
    onActive: ({ translationX }, { startLeft }) => {
      left.value = translationX + startLeft;
    },
    onEnd: () => {
      if (Math.abs(left.value) > width / 3) {
        left.value = -(width / 3);
      } else {
        left.value = 0;
      }
    },
  });

  return (
    <View>
      <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetX={[-20, 20]}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </PanGestureHandler>

      <Animated.View style={[style.icons, animatedIconStyle]}>
        <Icon name="delete" size={60} color="white" style={[style.icon, { backgroundColor: "#e11d48" }]} />
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  icons: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    padding: 4,
  },
  icon: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 4,
  }
})

export default ActivityBase;
