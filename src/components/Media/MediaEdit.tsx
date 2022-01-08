import { StyleSheet, Modal, View, TextInput, ViewStyle, TextStyle } from "react-native";
import { Dispatch, SetStateAction, useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";

import Text from "../Base/Text";
import Button from "../Base/Button";

import { MediaObject } from "../../types";
import { useColors } from "../../hooks/useColors";
import { mutateMediaListEntry } from "../../api/media/mutateMediaListEntry";

interface MediaEditProps {
  media: MediaObject;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setMedia: Dispatch<SetStateAction<MediaObject>>;
}

const MediaEdit = ({ media, setMedia, isVisible, setIsVisible }: MediaEditProps) => {
  const [status, setStatus] = useState(media.mediaListEntry?.status ? media.mediaListEntry.status : "Status");
  const score = useRef(media.mediaListEntry?.score || 0);
  const progress = useRef(media.mediaListEntry?.progress || 0);
  const { colors, color } = useColors();

  const extraStyle: ViewStyle | TextStyle = {
    color: colors.text,
    backgroundColor: colors.card,
  };

  const toggleVisible = () => {
    setIsVisible(visible => !visible);
  };

  const saveMediaListEntry = async () => {
    const newMedia = await mutateMediaListEntry({
      mediaId: media.id,
      score: score.current,
      progress: progress.current,
      status,
    });

    setMedia(newMedia);
    toggleVisible();
  }

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={style.center}>
        <View style={[style.container, { backgroundColor: colors.background }]}>
          <View style={style.row}>
            <Text style={style.label}>Status</Text>
            <Picker
              style={[style.picker, extraStyle]}
              dropdownIconColor={color}
              mode="dropdown"
              selectedValue={status}
              onValueChange={setStatus}
              itemStyle={{ backgroundColor: colors.background }}
            >
              <Picker.Item label="Current" value="CURRENT" />
              <Picker.Item label="Planning" value="PLANNING" />
              <Picker.Item label="Completed" value="COMPLETED" />
              <Picker.Item label="Repeating" value="REPEATING" />
              <Picker.Item label="Paused" value="PAUSED" />
              <Picker.Item label="Dropped" value="DROPPED" />
            </Picker>
          </View>
          <View style={style.row}>
            <Text style={style.label}>Score</Text>
            <TextInput
              onChangeText={val => score.current = parseInt(val)}
              defaultValue={`${score.current}`}
              keyboardType="numeric"
              style={[style.input, extraStyle]}
              placeholder="Score"
              placeholderTextColor="#A1A1A1"
            />
          </View>
          <View style={style.row}>
            <Text style={style.label}>Progress</Text>
            <TextInput
              onChangeText={val => progress.current = parseInt(val)}
              defaultValue={`${progress.current}`}
              keyboardType="numeric"
              style={[style.input, extraStyle]}
              placeholder="Score"
              placeholderTextColor="#A1A1A1"
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button onPress={toggleVisible}>Close</Button>
            <Button onPress={saveMediaListEntry}>Save</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderRadius: 10,
    padding: 10,
    width: "90%",
  },
  label: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  input: {
    flex: 4,
    borderRadius: 6,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 6,
  },
});

export default MediaEdit;
