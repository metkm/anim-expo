import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useColors } from "../hooks/useColors";

const Loading = () => {
  const { color } = useColors();

  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default Loading;
