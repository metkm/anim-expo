import React from "react";
import Animated, { SharedValue, interpolate, useAnimatedStyle, Extrapolate, useDerivedValue, runOnJS } from "react-native-reanimated";
import { StyleSheet, StatusBar, useColorScheme } from "react-native";

interface AnimBannerProps {
  title: string,
  bannerImage: string;
  scrollY: SharedValue<number>;
}

const EXPANDED_BANNER = 140;
const NARROWED_BANNER = 80;
const AnimBanner = ({ bannerImage, scrollY, title }: AnimBannerProps) => {
  const BANNER_TOTAL = EXPANDED_BANNER + NARROWED_BANNER;
  const isDark = useColorScheme() == "dark";
  const from = [0, BANNER_TOTAL];

  useDerivedValue(() => {
    if (isDark) return;

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

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [BANNER_TOTAL, BANNER_TOTAL + 50],
          [NARROWED_BANNER, NARROWED_BANNER / 2],
          Extrapolate.CLAMP
        )
      }
    ],
    opacity: interpolate(
      scrollY.value,
      [BANNER_TOTAL, BANNER_TOTAL + 50],
      [0, 1],
      Extrapolate.CLAMP
    )
  }))

  return (
    <Animated.View style={[style.container, bannerAnimatedStyle]}>
      <Animated.Image source={{ uri: bannerImage }} style={style.banner} />
      <Animated.View style={[style.darkOverlay, darkOverlayAnimatedStyle]} />

      <Animated.Text style={[style.title, titleAnimatedStyle]} numberOfLines={1}>{title}</Animated.Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    height: EXPANDED_BANNER + NARROWED_BANNER,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  darkOverlay: {
    position: "absolute",
    ...StyleSheet.absoluteFill as {},
    backgroundColor: "black"
  },
  title: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    maxWidth: "70%",
  }
});

export default AnimBanner;
