import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { getUserColor } from "../constants/profileColors";

export const useColors = () => {
  const profileColor = useSelector((state: RootState) => state.user.user?.options.profileColor);
  const { colors } = useTheme();

  return {
    color: profileColor ? getUserColor(profileColor) : colors.primary,
    colors
  }
}