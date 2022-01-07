import React from "react";
import { Pressable, Text, PressableProps, StyleSheet } from "react-native";
import { useColors } from "../../hooks/useColors";

const Button = (props: PressableProps) => {
  const { color } = useColors();

  return (
    <Pressable onPress={props.onPress} style={[style.buttonContainer, { backgroundColor: color }, {...props.style as {}}]}>
      <Text style={style.text}>{props.children}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  text: {
    color: "white",
    fontFamily: "Overpass_700Bold"
  }
});

export default Button;
