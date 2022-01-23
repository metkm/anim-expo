import { useState } from "react";
import { Pressable, StyleSheet, ViewProps, Dimensions } from "react-native";

import Text from "../components/Base/Text";
import { useColors } from "../hooks/useColors";

const Spoiler = ({ children }: ViewProps) => {
  const [isHided, setIsHided] = useState(true);
  const { colors, color } = useColors();

  const toggleSpoiler = () => {
    setIsHided(isHided => !isHided);
  };

  return (
    <Pressable onPress={toggleSpoiler} style={{ flexShrink: 1, backgroundColor: color }}>
      {isHided ? (
        <Text onPress={toggleSpoiler} style={[style.spoilerText, { backgroundColor: color }]}>
          Spoiler! Click to see!
        </Text>
      ) : (
        <Text style={{ width: Dimensions.get("window").width - 20 }}>{children}</Text>
      )}
    </Pressable>
  );
};

const style = StyleSheet.create({
  spoilerText: {
    bottom: -3
  },
});

export default Spoiler;
