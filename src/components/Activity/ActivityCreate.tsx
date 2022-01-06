import React, { useState } from "react";
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StyleProp,
  TextStyle,
  StatusBar,
} from "react-native";
import axios from "axios";

import Button from "../Base/Button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SaveTextActivity } from "../../graphql/mutations/SaveTextActivity";
import { useColors } from "../../hooks/useColors";

const ActivityCreate = () => {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { color, colors } = useColors();

  const toggleModal = () => setIsActive(isActive => !isActive);
  const createActivity = async () => {
    if (!text || text.length <= 5) return;

    await axios.post("/", {
      query: SaveTextActivity,
      variables: {
        text,
      },
    });

    toggleModal();
    setText("");
  };

  const CloseButton = () => (
    <Pressable onPress={toggleModal} style={style.closeButton}>
      <Icon name="close" size={20} color="white" />
    </Pressable>
  );

  const inputExtraStyle: StyleProp<TextStyle> = {
    borderColor: colors.border,
    color: colors.text,
  };

  return (
    <View>
      <TouchableOpacity style={[style.icon, { backgroundColor: color }]} onPress={toggleModal}>
        <Icon name="circle-edit-outline" size={26} color="white" />
      </TouchableOpacity>

      <Modal visible={isActive} transparent={true} animationType="fade">
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.8)" />
        <View style={style.centeredView}>
          <View style={[style.content, { backgroundColor: colors.card }]}>
            <CloseButton />

            <TextInput
              onChangeText={setText}
              value={text}
              placeholder="Write a status.."
              placeholderTextColor={colors.text}
              style={[style.input, inputExtraStyle]}
              multiline
              textAlignVertical="top"
            />

            <Button onPress={createActivity}>Send</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  icon: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    borderRadius: 1000,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    width: 320,
    height: 320,
    borderRadius: 4,
    padding: 10,
  },
  closeButton: {
    backgroundColor: "#FF605C",
    padding: 10,
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  input: {
    padding: 4,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 4,
    flex: 1,
  },
});

export default ActivityCreate;
