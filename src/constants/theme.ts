import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export const colors = {
  purple: "#8b5cf6"
}

export const darkColors = {
  primary: "#0B0B0B",
  secondary: "#141414",
  third: "#3A3A3A"  
}

export const lightColors = {
  primary: "#fafafa",
  secondary: "#f4f4f5",
}

export const animDark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.purple,
    background: darkColors.primary,
    card: darkColors.secondary
  }
}

export const animLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.purple,
    background: lightColors.primary,
    card: lightColors.secondary,
  }
}
