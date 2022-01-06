import { Easing, WithTimingConfig } from "react-native-reanimated";

export const timingConfig: WithTimingConfig = {
  duration: 300,
  easing: Easing.out(Easing.sin)
}
