import React from "react";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SettingsNavigationProps } from "../../pages/pageProps";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UserSettingsCog = () => {
  const navigation = useNavigation<SettingsNavigationProps>();

  const onPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <Icon style={style.cog} onPress={onPress} name="cog" size={22} color="white" />
  );
};

const style = StyleSheet.create({
  cog: {
    marginLeft: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 8,
    borderRadius: 100,
  },
});

export default UserSettingsCog;
