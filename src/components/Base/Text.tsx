import React from "react";
import { Text as _Text, TextProps } from "react-native";
import { useTheme } from "@react-navigation/native"

const Text = (props: TextProps) => {
  const { colors } = useTheme();
  const { style, ...rest } = props;

  return <_Text style={[{ color: colors.text }, style]} {...rest} />;
};

export default Text;
