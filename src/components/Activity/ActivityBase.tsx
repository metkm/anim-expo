import { ViewProps } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { springConfig } from "../../constants/reanimated";

interface ActivityBaseProps extends ViewProps {
  children: JSX.Element;
}

type AnimatedGHContext = {
  start: number;
};

const ActivityBase = ({ children }: ActivityBaseProps) => {
  const { width } = useSafeAreaFrame();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, springConfig),
      },
    ],
  }));

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
    onStart: ({ translationX }, context) => {
      context.start = translationX;
    },
    onActive: ({ translationX }, { start }) => {
      translateX.value = translationX + start;
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > width / 3 + 100) {
        translateX.value = -(width / 3);
      } else {
        translateX.value = 0;
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default ActivityBase;
