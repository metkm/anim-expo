import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { timingConfig } from "../constants/reanimated";

import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { RectButton } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimTabButton = ({ accessibilityState, onPress, children }: BottomTabBarButtonProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (accessibilityState?.selected) {
      scale.value = 1.4;
    } else {
      scale.value = 1;
    }
  }, [accessibilityState?.selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [
      {
        scale: withTiming(scale.value, timingConfig),
      },
    ],
  }));

  return (
    // @ts-ignore
    <RectButton style={styles.container} onPress={onPress}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimTabButton;
