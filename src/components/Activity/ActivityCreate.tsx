import { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useColors } from "../../hooks/useColors";
import { springConfig } from "../../constants/reanimated";

import Button from "../Base/Button";
import { saveTextActivity } from "../../api/activity/saveTextActivity";
import { TextActivityObject } from "../../api/objectTypes";

interface ActivityCreateProps {
  activityCallback: (activity: TextActivityObject) => void;
}

const ActivityCreate = ({ activityCallback }: ActivityCreateProps) => {
  const bottomHeight = useBottomTabBarHeight();
  const { colors, color } = useColors();
  const { height } = useSafeAreaFrame();
  const top = useSharedValue(height - bottomHeight - 26);
  const text = useRef("");

  const createActivity = async () => {
    if (text.current.length < 5) return;
    const activity = await saveTextActivity(text.current);

    top.value = withSpring(height - bottomHeight - 26, springConfig, () => {
      runOnJS(activityCallback)(activity);
    });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.background,
    top: withSpring(top.value, springConfig),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onActive: ({ absoluteY }) => {
      top.value = absoluteY;
    },
    onEnd: () => {
      if (top.value > height / 3 + 300) {
        top.value = height - bottomHeight - 26;
      } else {
        top.value = height / 3;
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[style.container, animatedStyle]}>
        <View style={[style.line, { backgroundColor: color }]} />

        <TextInput
          style={[style.input, { backgroundColor: colors.card, color: colors.text }]}
          onChangeText={newText => text.current = newText}
          placeholder="Write a status.."
          placeholderTextColor="#A1A1A1"
          textAlignVertical="top"
          multiline
        />

        <Button style={{ width: "100%" }} onPress={createActivity}>Post!</Button>
      </Animated.View>
    </PanGestureHandler>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    elevation: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    overflow: "hidden"
  },
  input: {
    flex: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
  },
  line: {
    width: "50%",
    height: 6,
    borderRadius: 1000,
  }
});

export default ActivityCreate;
