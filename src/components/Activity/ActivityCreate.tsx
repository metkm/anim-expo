import { memo, useRef, useState } from "react";
import { StyleSheet, Switch, TextInput, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import { useColors } from "../../hooks/useColors";
import { springConfig } from "../../constants/reanimated";

import { MessageActivityObject, TextActivityObject } from "../../api/objectTypes";
import { saveTextActivity } from "../../api/activity/saveTextActivity";
import { saveMessageActivity } from "../../api/activity/saveMessageActivity";

import Button from "../Base/Button";
import Text from "../Base/Text";

interface ActivityCreateProps {
  activityCallback: (activity: TextActivityObject | MessageActivityObject) => void;
  recipientId?: number;
}

const ActivityCreate = ({ activityCallback, recipientId }: ActivityCreateProps) => {
  try {
    var bottomHeight = useBottomTabBarHeight();
  } catch {
    bottomHeight = 20;
  }
  const [isPriv, setIsPriv] = useState(false);
  const { height } = useSafeAreaFrame();
  const { colors, color } = useColors();

  const COLLAPSED = height - bottomHeight - 26;
  const EXPANDED = height / 3;

  const top = useSharedValue(COLLAPSED);
  const text = useRef("");

  const createActivity = async () => {
    if (text.current.length < 5) return;
    const activity = recipientId
      ? await saveMessageActivity(recipientId, text.current, isPriv)
      : await saveTextActivity(text.current);

    top.value = withSpring(height - bottomHeight - 26, springConfig, () => {
      runOnJS(activityCallback)(activity);
    });
  };

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: colors.background,
      top: withSpring(top.value, springConfig),
    }),
    []
  );

  const gestureHandler = useAnimatedGestureHandler(
    {
      onActive: ({ absoluteY }) => {
        top.value = absoluteY;
      },
      onEnd: () => {
        if (top.value > EXPANDED + 300) {
          top.value = COLLAPSED;
        } else {
          top.value = EXPANDED;
        }
      },
    },
    []
  );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[style.container, animatedStyle]}>
        <View style={[style.line, { backgroundColor: color }]} />

        {recipientId ? (
          <View style={style.setting}>
            <Text>Private</Text>
            <Switch
              value={isPriv}
              onValueChange={setIsPriv}
              trackColor={{ false: colors.text, true: color }}
              thumbColor={colors.text}
            />
          </View>
        ) : (
          <></>
        )}

        <TextInput
          style={[style.input, { backgroundColor: colors.card, color: colors.text }]}
          onChangeText={newText => (text.current = newText)}
          placeholder="Write a status.."
          placeholderTextColor="#A1A1A1"
          textAlignVertical="top"
          multiline
        />

        <Button style={{ width: "100%" }} onPress={createActivity}>
          Post!
        </Button>
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
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
  },
  line: {
    width: "20%",
    height: 6,
    borderRadius: 1000,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(ActivityCreate);
