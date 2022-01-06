import { useRef } from "react";
import { TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { timingConfig } from "../../constants/reanimated";
import { useColors } from "../../hooks/useColors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ActivityCreate = () => {
  const { colors, color } = useColors();
  const isOpen = useSharedValue(0);
  const activityText = useRef("");

  const textChangeHandler = (text: string) => {
    activityText.current = text;
  };

  const openHandler = () => {
    isOpen.value = withTiming(isOpen.value == 0 ? 1 : 0);
  }

  const activityContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        isOpen.value,
        [0, 1],
        [-140, 0]
      )
    };
  });

  return (
    <Animated.View style={[style.container, activityContainerStyle]}>
      <AnimatedTouchableOpacity style={[style.icon, { backgroundColor: color }]} onPress={openHandler}>
        <Icon name="circle-edit-outline" size={26} color="white" />
      </AnimatedTouchableOpacity>

      <Animated.View style={[style.activityContainer, { backgroundColor: colors.background }]}>
        <TextInput
          onChangeText={textChangeHandler}
          placeholder="Write a status..."
          placeholderTextColor="#A1A1A1"
          style={{ color: colors.text }}
          multiline
        />
      </Animated.View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  icon: {
    borderRadius: 1000,
    padding: 10,
    bottom: 10,
    right: 10,
  },
  activityContainer: {
    width: "100%",
    padding: 10,
    height: 140,
  },
  input: {},
});

export default ActivityCreate;
