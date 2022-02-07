import { StyleSheet, View, TextInput, ViewStyle, TextStyle } from "react-native";
import { useRef, createRef, useEffect } from "react";

import Text from "../Base/Text";
import Button from "../Base/Button";
import AnimSheet from "../AnimSheet";
import AnimPicker from "../AnimPicker";

import { MediaObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";
import { mutateMediaListEntry } from "../../api/media/mutateMediaListEntry";
import { AnimSheetHandle } from "../types";

interface MediaEditProps {
  media: MediaObject;
  isVisible: boolean;
  editCallback?: (media: MediaObject, oldMedia: MediaObject) => void;
}

const MediaEdit = ({ media, isVisible, editCallback }: MediaEditProps) => {
  const status = useRef(media.mediaListEntry?.status ? media.mediaListEntry.status : "Status");
  const progress = useRef(media.mediaListEntry?.progress || 0);
  const score = useRef(media.mediaListEntry?.score || 0);

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
      status: status.current.toUpperCase(),
    });

    if (editCallback) {
      editCallback(newMedia, media);
    }
    sheet.current?.toggle();
  };

  const onValue = (item: string) => {
    status.current = item;
  }

  return (
    <AnimSheet ref={sheet} showTop={false}>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <AnimPicker 
          labels={["Current", "Planning", "Completed", "Repeating", "Paused", "Dropped"]}
          renderItem={({ item }) => <Text style={styles.pickerItem}>{item}</Text>}
          onChange={onValue}
          itemHeight={40}
        />
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
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    flex: 1,
  },
  pickerItem: {
    textAlign: "center",
    textAlignVertical: "center",
    height: 40,
  }
});

export default MediaEdit;
