import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SettingsNavigationProps } from "../../pages/pageProps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UserSettingsCog = () => {
  const navigation = useNavigation<SettingsNavigationProps>();

  const onPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <Pressable style={style.cog} onPress={onPress}>
      <Icon name="cog" size={18} color="white" />
    </Pressable>
  );
};

const style = StyleSheet.create({
  cog: {
    marginLeft: "auto",
  },
});

export default UserSettingsCog;
