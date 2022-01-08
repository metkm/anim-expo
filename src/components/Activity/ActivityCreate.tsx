import axios from "axios";
import { useRef } from "react";
import { TouchableOpacity, StyleSheet, TextInput, useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { timingConfig } from "../../constants/reanimated";
import { useColors } from "../../hooks/useColors";

import Button from "../Base/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SaveTextActivity from "../../graphql/mutations/SaveTextActivity";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ActivityCreate = () => {
  const { height } = useWindowDimensions();
  const { colors, color } = useColors();
  const isOpen = useSharedValue(0);
  const activityText = useRef("");
  console.log(-(height / 2));

  const activityCreate = async () => {
    if (!activityText.current || activityText.current.length <= 5) return;

    await axios.post("/", {
      query: SaveTextActivity,
      variables: {
        text: activityText.current,
      },
    });

    isOpen.value = withTiming(0, timingConfig);
  }

  const textChangeHandler = (text: string) => {
    activityText.current = text;
  };

  const openHandler = () => {
    isOpen.value = withTiming(isOpen.value == 0 ? 1 : 0, timingConfig);
  }

  const activityContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        isOpen.value,
        [0, 1],
        [-(height / 2) + 70, 0]
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
          style={{ color: colors.text, flex: 1 }}
          textAlignVertical="top"
          multiline
        />

        <Button onPress={activityCreate}>Create Activity</Button>
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
    height: "50%"
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
    elevation: 10,
    flex: 1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});

export default ActivityCreate;
