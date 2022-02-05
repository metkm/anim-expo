import { createRef, memo, useRef, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { useColors } from "../../hooks/useColors";

import { MessageActivityObject, TextActivityObject } from "../../api/objectTypes";
import { saveTextActivity } from "../../api/activity/saveTextActivity";
import { saveMessageActivity } from "../../api/activity/saveMessageActivity";

import { TextInput } from "react-native-gesture-handler";

import AnimSheet from "../AnimSheet";
import Button from "../Base/Button";
import Text from "../Base/Text";
import { AnimSheetHandle } from "../types";

interface ActivityCreateProps {
  activityCallback: (activity: TextActivityObject | MessageActivityObject) => void;
  recipientId?: number;
}

const ActivityCreate = ({ activityCallback, recipientId }: ActivityCreateProps) => {
  const [isPriv, setIsPriv] = useState(false);
  const { colors, color } = useColors();
  const text = useRef("");
  const sheet = createRef<AnimSheetHandle>();

  const createActivity = async () => {
    if (text.current.length < 5) return;
    const activity = recipientId
      ? await saveMessageActivity(recipientId, text.current, isPriv)
      : await saveTextActivity(text.current);

    sheet.current?.toggle();
    activityCallback(activity);
  };

  return (
    <AnimSheet ref={sheet}>
      {recipientId && (
        <View style={styles.setting}>
          <Text>Private</Text>
          <Switch
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            value={isPriv}
            onValueChange={setIsPriv}
            trackColor={{ false: colors.text, true: color }}
            thumbColor={colors.text}
          />
        </View>
      )}

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        onChangeText={newText => (text.current = newText)}
        placeholder="Write a status.."
        placeholderTextColor="#A1A1A1"
        textAlignVertical="top"
        multiline
      />

      <Button style={{ width: "100%" }} onPress={createActivity}>
        Post!
      </Button>
    </AnimSheet>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(ActivityCreate);
