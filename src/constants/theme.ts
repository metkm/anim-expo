import { DarkTheme } from "@react-navigation/native";

export const colors = {
  purple: "#8083FF"
}

export const darkColors = {
  primary: "#0B0B0B",
  secondary: "#141414",
  third: "#3A3A3A"
}

export const animDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.purple,
    background: darkColors.primary,
    card: darkColors.secondary
  }
}
