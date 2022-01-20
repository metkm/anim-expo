import { Pressable, ViewProps } from "react-native";

import { useState } from "react";
import { useColors } from "../hooks/useColors";

import Text from "../components/Base/Text";

const Spoiler = ({ children }: ViewProps) => {
  const [isHided, setIsHided] = useState(true);
  const { color } = useColors();

  const toggleSpoiler = () => {
    setIsHided(isHided => !isHided);
  }

  return (
    <Pressable onPress={toggleSpoiler}>
      {
        isHided
        ? <Text onPress={toggleSpoiler} style={{ backgroundColor: color, padding: 2, borderRadius: 2 }}>Spoiler! Click to see!</Text>
        : <>{children}</>
      }
    </Pressable>
  )
}

export default Spoiler;
