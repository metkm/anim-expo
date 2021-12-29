import React, { useEffect } from "react";
import { Animated, ImageBackground, StyleSheet, ViewProps, ViewStyle } from "react-native";

interface BannerProps extends ViewProps {
  bannerImage: string,
  // scrollY: Animated.Value
}

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const Banner = ({ bannerImage, children }: BannerProps) => {
  // useEffect(() => {
  //   console.log(scrollY);
  // }, [scrollY])
  
  // const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
  //   height: scrollY.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: [150, 100],
  //     extrapolate: "clamp"
  //   })
  // }

  return (
    <AnimatedImageBackground source={{ uri: bannerImage }} style={[style.banner]}>
      { children }
    </AnimatedImageBackground>
  )
}

const style = StyleSheet.create({
  banner: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 150
  }
});

export default Banner;
