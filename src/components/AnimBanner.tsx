import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import { StyleSheet, StatusBar, useColorScheme, ViewProps, View } from "react-native";
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
  const isDark = useColorScheme() == "dark";
  const from = [0, NARROWED_BANNER];

  useDerivedValue(() => {
    if (isDark) return;

    if (scrollY.value > expandedHeight / 2) {
      runOnJS(StatusBar.setBarStyle)("light-content");
      return;
    }

    runOnJS(StatusBar.setBarStyle)("dark-content");
  }, [scrollY]);

  const bannerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.card,
    height: interpolate(scrollY.value, from, [expandedHeight, NARROWED_BANNER], Extrapolate.CLAMP),
  }), []);

  const darkOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, from, [0, 0.8], Extrapolate.CLAMP),
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
      <Animated.View style={[style.darkOverlay, darkOverlayAnimatedStyle]} />
      <Animated.Text style={[style.title, titleAnimatedStyle]} numberOfLines={1}>
        {title}
      </Animated.Text>

      <View style={[style.elementsContainer, { height: NARROWED_BANNER }]}>{children}</View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    // height: expandedHeight + NARROWED_BANNER,
    left: 0,
    right: 0,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    overflow: "hidden",
  },
  banner: {
    position: "absolute",
    ...(StyleSheet.absoluteFill as {}),
  },
  darkOverlay: {
    position: "absolute",
    backgroundColor: "black",
    ...(StyleSheet.absoluteFill as {}),
  },
  title: {
    position: "absolute",
    color: "white",
    fontFamily: "Overpass_700Bold",
    fontSize: 18,
    maxWidth: "70%",
    bottom: 0,
    top: StatusBar.currentHeight,
    textAlignVertical: "center",
  },
  elementsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AnimBanner;
