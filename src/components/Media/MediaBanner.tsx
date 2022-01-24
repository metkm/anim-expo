import { Image, StyleSheet } from "react-native";
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";

interface MediaBannerProps {
  uri: string;
  y: SharedValue<number>;
}

const MediaBanner = ({ uri, y }: MediaBannerProps) => {
  const headerHeight = useHeaderHeight();

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0,
    right: 0,
    height: interpolate(
      y.value,
      [0, headerHeight],
      [190, headerHeight],
      Extrapolate.CLAMP,
    )
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image style={style.img} source={{ uri }} />
    </Animated.View>
  )
}

const style = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
  }
});

export default MediaBanner;
