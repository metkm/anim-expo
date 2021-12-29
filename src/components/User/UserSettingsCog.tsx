import React from "react";
import {
  Pressable, StyleSheet, StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SettingsNavigationProps } from "../../pages/pageProps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UserSettingsCog = () => {
  const navigation = useNavigation<SettingsNavigationProps>();

  const onPress = () => {
    navigation.navigate("Settings");
  }

  return (
    <Pressable style={style.cog} onPress={onPress}>
      <Icon name="cog" size={18} color="white" />
    </Pressable>
  )
}

const style = StyleSheet.create({
  cog: {
    position: "absolute",
    right: 10,
    top: StatusBar.currentHeight! + 4,
    zIndex: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 1000,
  },
})

export default UserSettingsCog;
