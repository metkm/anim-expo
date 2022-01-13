import React from "react";
import { Pressable, Text, PressableProps, StyleSheet } from "react-native";
import { useColors } from "../../hooks/useColors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ButtonProps extends PressableProps {
  icon?: string
}

const Button = ({ onPress, style, children, icon }: ButtonProps) => {
  const { color } = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, { backgroundColor: color }, { ...style as {}}]}
    >
      { icon && <Icon style={styles.icon} name={icon} color="white" /> }
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 2,
  },
  text: {
    color: "white",
    fontFamily: "Overpass_700Bold",
  },
  icon: {
    marginHorizontal: 4,
  }
});

export default Button;
