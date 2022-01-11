import { Easing, WithSpringConfig, WithTimingConfig } from "react-native-reanimated";

export const timingConfig: WithTimingConfig = {
  duration: 300,
  easing: Easing.out(Easing.sin)
}

export const springConfig: WithSpringConfig = {
  damping: 16,
  stiffness: 150
}
