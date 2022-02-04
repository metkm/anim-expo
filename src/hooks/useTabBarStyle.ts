import { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "./useColors";

export const useTabBarStyle = (padd: boolean = true) => {
  const { color } = useColors();
  const { top } = useSafeAreaInsets();
  const totalHeight = 170 + (padd ? top + 10 : 10);

  const tabBarStyle: StyleProp<ViewStyle> = {
    marginTop: padd ? top + 10 : 10,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  }

  const tabBarIndicatorStyle: StyleProp<ViewStyle> = {
    backgroundColor: color,
  }

  return {
    tabBarStyle,
    totalHeight,
    tabBarIndicatorStyle,
  }
}
