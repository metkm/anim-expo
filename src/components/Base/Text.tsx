import React from "react";
import { Text as _Text, TextProps } from "react-native";
import { useTheme } from "@react-navigation/native"

const Text = ({ style, ...rest }: TextProps) => {
  const { colors } = useTheme();

  return <_Text  style={[{ color: colors.text }, style]} {...rest} />;
};

export default Text;
