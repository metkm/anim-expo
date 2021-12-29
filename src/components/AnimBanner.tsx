import React from "react";
import Animated, { SharedValue, interpolate, useAnimatedStyle, Extrapolate, useDerivedValue, runOnJS } from "react-native-reanimated";
import { StyleSheet, StatusBar } from "react-native";

interface AnimBannerProps {
  bannerImage: string;
  scrollY: SharedValue<number>;
}

const EXPANDED_BANNER = 150;
const NARROWED_BANNER = 100;
const AnimBanner = ({ bannerImage, scrollY }: AnimBannerProps) => {
  const from = [0, EXPANDED_BANNER + NARROWED_BANNER];

  useDerivedValue(() => {
    if (scrollY.value > EXPANDED_BANNER / 2) {
      runOnJS(StatusBar.setBarStyle)("light-content");
      return
    }

    runOnJS(StatusBar.setBarStyle)("dark-content");
  }, [scrollY])

  const bannerAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      from,
      [EXPANDED_BANNER, NARROWED_BANNER],
      Extrapolate.CLAMP
    ),
  }));

  const darkOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      from,
      [0, 0.80],
      Extrapolate.CLAMP
    ),
  }));

  const barColor = useAnimatedStyle(() => ({

  }));

  return (
    <Animated.View style={[style.container, bannerAnimatedStyle]}>
      <Animated.Image source={{ uri: bannerImage }} style={style.banner} />
      <Animated.View style={[style.darkOverlay, darkOverlayAnimatedStyle]} />

    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    height: EXPANDED_BANNER + NARROWED_BANNER,
    left: 0,
    right: 0,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  darkOverlay: {
    position: "absolute",
    ...StyleSheet.absoluteFill as {},
    backgroundColor: "black"
  }
});

export default AnimBanner;
