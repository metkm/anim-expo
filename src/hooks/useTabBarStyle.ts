import { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "./useColors";

export const useTabBarStyle = (pgCount: number = 1, padd: boolean = true) => {
  const { color } = useColors();
  const { width } = useSafeAreaFrame();
  const { top } = useSafeAreaInsets();

  const tabWidth = width / pgCount - 10;
  const indicatorWidth = 60;

  const tabBarStyle: StyleProp<ViewStyle> = {
    width: "90%",
    borderRadius: 10,
    marginHorizontal: 20,
    top: padd ? top + 10: 10,
  }

  const tabBarIndicatorStyle: StyleProp<ViewStyle> = {
    backgroundColor: color,
    width: indicatorWidth,
    left: (tabWidth - indicatorWidth) / 2,
    borderRadius: 1000,
  }

  const sceneContainerStyle: StyleProp<ViewStyle> = {
    paddingTop: padd ? 10 + 44 : 10,
  }

  return {
    tabBarStyle,
    tabBarIndicatorStyle,
    sceneContainerStyle,
  }
}
