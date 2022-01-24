import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  Extrapolate,
} from "react-native-reanimated";
import { StyleSheet, ViewProps, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "../hooks/useColors";

interface AnimBannerProps extends ViewProps {
  title?: string;
  expandedHeight?: number;
  bannerImage: string;
  scrollY: SharedValue<number>;
}

const AnimBanner = ({ bannerImage, scrollY, title, children, expandedHeight = 140 }: AnimBannerProps) => {
  const NARROWED_BANNER = 90;

  const { colors } = useColors();
  const { top } = useSafeAreaInsets();
  const from = [0, NARROWED_BANNER];

  const bannerAnimatedStyle = useAnimatedStyle(() => ({
    paddingTop: top,
    backgroundColor: colors.card,
    height: interpolate(scrollY.value, from, [expandedHeight, NARROWED_BANNER], Extrapolate.CLAMP),
  }), []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [NARROWED_BANNER, NARROWED_BANNER + 50],
          [NARROWED_BANNER, 0],
          Extrapolate.CLAMP
        ),
      },
    ],
    opacity: interpolate(scrollY.value, [NARROWED_BANNER, NARROWED_BANNER + 50], [0, 1], Extrapolate.CLAMP),
  }), []);

  return (
    <Animated.View style={[style.container, bannerAnimatedStyle]}>
      <Animated.Image source={{ uri: bannerImage }} style={style.banner} />
      <Animated.Text style={[style.title, titleAnimatedStyle]} numberOfLines={1}>
        {title}
      </Animated.Text>

      <View style={[style.elementsContainer, { height: NARROWED_BANNER, paddingTop: top }]}>{children}</View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    overflow: "hidden",
  },
  banner: {
    position: "absolute",
    ...(StyleSheet.absoluteFill as {}),
  },
  title: {
    position: "absolute",
    bottom: 5,
    borderRadius: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    fontFamily: "Overpass_700Bold",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
    maxWidth: "70%",
  },
  elementsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AnimBanner;
