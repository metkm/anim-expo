import { memo, useRef, useState } from "react";
import { StyleSheet, Switch, TextInput, View } from "react-native";
import { useColors } from "../../hooks/useColors";

import { MessageActivityObject, TextActivityObject } from "../../api/objectTypes";
import { saveTextActivity } from "../../api/activity/saveTextActivity";
import { saveMessageActivity } from "../../api/activity/saveMessageActivity";

import Button from "../Base/Button";
import Text from "../Base/Text";
import AnimSheet from "../AnimSheet";

interface ActivityCreateProps {
  activityCallback: (activity: TextActivityObject | MessageActivityObject) => void;
  recipientId?: number;
}

const ActivityCreate = ({ activityCallback, recipientId }: ActivityCreateProps) => {
  const [isPriv, setIsPriv] = useState(false);
  const { colors, color } = useColors();

  const text = useRef("");

  const createActivity = async () => {
    if (text.current.length < 5) return;
    const activity = recipientId
      ? await saveMessageActivity(recipientId, text.current, isPriv)
      : await saveTextActivity(text.current);

    activityCallback(activity);
  };

  return (
    <AnimSheet>
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

      <Button onPress={createActivity}>Post!</Button>
    </AnimSheet>
  );
};

const style = StyleSheet.create({
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
