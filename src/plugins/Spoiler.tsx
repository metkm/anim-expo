import { Pressable, StyleSheet, ViewProps } from "react-native";

import { useState } from "react";
import Text from "../components/Base/Text";

const Spoiler = ({ children }: ViewProps) => {
  const [isHided, setIsHided] = useState(true);

  const toggleSpoiler = () => {
    setIsHided(isHided => !isHided);
  };

  return (
    <Pressable onPress={toggleSpoiler}>
      {isHided ? (
        <Text onPress={toggleSpoiler} style={style.spoilerText}>
          Spoiler! Click to see!
        </Text>
      ) : (
        <>{children}</>
      )}
    </Pressable>
  );
};

const style = StyleSheet.create({
  spoilerText: {
    backgroundColor: "#181818",
    padding: 2,
    borderRadius: 2,
    color: "white",
  },
});

export default Spoiler;
