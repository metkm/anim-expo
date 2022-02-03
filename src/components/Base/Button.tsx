import React from "react";
import { Text, StyleSheet, TouchableHighlightProps } from "react-native";
import { useColors } from "../../hooks/useColors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps extends TouchableHighlightProps {
  icon?: string;
  onPress: () => void;
}

const Button = ({ onPress, style, children, icon }: ButtonProps) => {
  const { color } = useColors();

  return (
    <RectButton onPress={onPress} style={[styles.outer, { backgroundColor: color }, { ...(style as {}) }]}>
      {icon && <Icon style={styles.icon} size={20} name={icon} color="white" />}
      <Text style={styles.text}>{children}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  outer: {
    margin: 2,
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    flexGrow: 1,
    textAlign: "center",
    fontFamily: "Overpass_700Bold",
  },
  icon: {
    position: "absolute",
    left: 4,
    top: 0,
    bottom: 0,
    marginHorizontal: 4,
    textAlignVertical: "center",
  },
});

export default Button;
