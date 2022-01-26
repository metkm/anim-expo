import React from "react";
import { Text, StyleSheet, TouchableHighlight, TouchableHighlightProps, View } from "react-native";
import { useColors } from "../../hooks/useColors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ButtonProps extends TouchableHighlightProps {
  icon?: string
}

const Button = ({ onPress, style, children, icon }: ButtonProps) => {
  const { color } = useColors();

  return (
    <TouchableHighlight
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.outer}
    >
      <View style={[styles.inner, { backgroundColor: color }, { ...style as {}}]}>
        { icon && <Icon style={styles.icon} size={16} name={icon} color="white" /> }
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  inner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
  },
  outer: {
    margin: 2,
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
