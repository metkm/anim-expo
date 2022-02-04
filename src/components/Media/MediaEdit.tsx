import { StyleSheet, Modal, View, TextInput, ViewStyle, TextStyle } from "react-native";
import { Dispatch, SetStateAction, useState, useRef, createRef, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import Text from "../Base/Text";
import Button from "../Base/Button";
import AnimSheet from "../AnimSheet";

import { MediaObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";
import { mutateMediaListEntry } from "../../api/media/mutateMediaListEntry";
import { Portal } from "@gorhom/portal";
import { AnimSheetHandle } from "../types";

interface MediaEditProps {
  media: MediaObject;
  isVisible: boolean;
  editCallback?: (media: MediaObject, oldMedia: MediaObject) => void;
}

const MediaEdit = ({ media, isVisible, editCallback }: MediaEditProps) => {
  const [status, setStatus] = useState(media.mediaListEntry?.status ? media.mediaListEntry.status : "Status");
  const progress = useRef(0);
  const score = useRef(0);

  const { colors } = useColors();
  const sheet = createRef<AnimSheetHandle>();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    sheet.current?.toggle();
  }, [isVisible]);

  const extraStyle: ViewStyle | TextStyle = {
    color: colors.text,
    backgroundColor: colors.card,
  };

  const saveMediaListEntry = async () => {
    const newMedia = await mutateMediaListEntry({
      mediaId: media.id,
      score: score.current,
      progress: progress.current,
      status,
    });

    if (editCallback) {
      editCallback(newMedia, media);
    }
    sheet.current?.toggle();
  }

  return (
    <AnimSheet ref={sheet} showTop={false}>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Picker style={[styles.picker, extraStyle]} selectedValue={status} onValueChange={setStatus}>
          <Picker.Item label="Current" value="CURRENT" />
          <Picker.Item label="Planning" value="PLANNING" />
          <Picker.Item label="Completed" value="COMPLETED" />
          <Picker.Item label="Repeating" value="REPEATING" />
          <Picker.Item label="Paused" value="PAUSED" />
          <Picker.Item label="Dropped" value="DROPPED" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Score</Text>
        <TextInput
          onChangeText={val => (score.current = parseInt(val))}
          defaultValue={`${score.current}`}
          keyboardType="numeric"
          style={[styles.input, extraStyle]}
          placeholder="Score"
          placeholderTextColor="#A1A1A1"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Progress</Text>
        <TextInput
          onChangeText={val => (progress.current = parseInt(val))}
          defaultValue={`${progress.current}`}
          keyboardType="numeric"
          style={[styles.input, extraStyle]}
          placeholder="Score"
          placeholderTextColor="#A1A1A1"
        />
      </View>

      <Button onPress={saveMediaListEntry}>Save</Button>
    </AnimSheet>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 4,
  },
  picker: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    borderRadius: 6,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    flex: 1,
  }

  // center: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // container: {
  //   borderRadius: 10,
  //   padding: 10,
  //   width: "90%",
  // },
  // label: {
  //   flex: 1,
  // },
  // row: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 6,
  // },
  // input: {
  //   flex: 1,
  //   borderRadius: 6,
  //   marginLeft: 10,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  // },
  // picker: {
  //   flex: 1,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   marginLeft: 10,
  //   borderRadius: 6,
  // },
});

export default MediaEdit;
