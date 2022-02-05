import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useColors } from "../hooks/useColors";

const Loading = () => {
  const { color } = useColors();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default Loading;
