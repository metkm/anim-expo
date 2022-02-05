import { Image, StyleSheet, View, ViewProps } from "react-native";
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MediaBannerProps extends ViewProps {
  uri: string;
  y: SharedValue<number>;
}

const MediaBanner = ({ uri, y, children }: MediaBannerProps) => {
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: 0,
    right: 0,
    height: interpolate(
      y.value,
      [0, headerHeight],
      [160 + top, headerHeight],
      Extrapolate.CLAMP,
    )
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image style={styles.img} source={{ uri }} />
      <View style={[styles.elements, { height: headerHeight, paddingTop: top }]}>
        {children}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
  },
  elements: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingRight: 10,
    flexDirection :"row",
    alignItems: "center",
  }
});

export default MediaBanner;
