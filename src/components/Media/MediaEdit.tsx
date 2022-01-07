import { Dispatch, SetStateAction, useState } from "react";
import { Modal, StyleSheet, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useColors } from "../../hooks/useColors";

import Text from "../Base/Text";
import Button from "../Base/Button";

import { getMediaListEntry } from "../../api/media/getMediaListEntry";
import { MediaListObject } from "../../types";

interface MediaEditProps {
  mediaId: number;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const MediaEdit = ({ mediaId, isVisible, setIsVisible }: MediaEditProps) => {
  const [mediaListEntry, setMediaListEntry] = useState<MediaListObject>();
  const [status, setStatus] = useState(mediaListEntry ? mediaListEntry.status : "Status");
  const { colors } = useColors();
  
  const getMediaEntry = () => {
    getMediaListEntry(mediaId).then(setMediaListEntry);
  }

  const elementStyle: ViewStyle | TextStyle = {
    backgroundColor: colors.card,
    color: colors.text,
  };

  return (
    <Modal visible={isVisible} onShow={getMediaEntry} transparent>
      <View style={style.center}>
        {
          mediaListEntry &&
          <View style={[style.container, { backgroundColor: colors.background }]}>
            <View style={style.row}>
              <Text style={style.label}>Status</Text>
              <Picker
                mode="dropdown"
                style={[style.picker, elementStyle]}
                selectedValue={status}
                onValueChange={status => setStatus(status)}
              >
                <Picker.Item label="Reading" value="Reading" />
                <Picker.Item label="Plan To Read" value="Plan To Read" />
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Rereading" value="Rereading" />
                <Picker.Item label="Paused" value="Paused" />
                <Picker.Item label="Dropped" value="Dropped" />
              </Picker>
            </View>

            <View style={style.row}>
              <Text style={style.label}>Score</Text>
              <TextInput
                defaultValue={`${mediaListEntry.score}`}
                keyboardType="numeric"
                style={[style.input, elementStyle]}
                placeholder="Score"
                placeholderTextColor="#A1A1A1"
              />
            </View>

            <Button onPress={() => setIsVisible(visible => !visible)}>Close</Button>
          </View>
        }
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
  label: {
    flex: 1,
  },
});

export default MediaEdit;
