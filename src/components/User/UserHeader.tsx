import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, StyleSheet } from "react-native";
import { UserObject } from "../../api/objectTypes";

import { useColors } from "../../hooks/useColors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProps } from "../../pages/props";

// components
import UserStats from "./UserStats";
import Text from "../Base/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface UserHeaderProps {
  user: UserObject,
}

const UserHeader = ({ user }: UserHeaderProps) => {
  const navigation = useNavigation<StackNavigationProps<"Settings" | "Notifications">>();
  const { colors } = useColors();

  const pressHandlerSettings = () => {
    navigation.navigate("Settings");
  };

  const pressHandlerNotifications = () => {
    navigation.navigate("Notifications")
  };

  return (
    <View style={style.content}>
      <Image style={style.banner} source={{ uri: user.bannerImage }} />
      <View style={style.container}>
        <Image style={style.avatar} source={{ uri: user.avatar.large }} />
        <View style={style.inner}>
          <Text style={style.name} numberOfLines={2}>{user.name}</Text>
          <View>
            <Icon style={style.icon} onPress={pressHandlerNotifications} name="bell" color={colors.text} size={20} />
            <Icon style={style.icon} onPress={pressHandlerSettings} name="cog" color={colors.text} size={20} />
          </View>
        </View>
      </View>

      <UserStats user={user} />
      <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.4)" />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    marginBottom: 10,
    height: 380,
  },
  banner: {
    height: 180,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  container: {
    marginTop: -20,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  avatar: {
    height: 90,
    aspectRatio: 1,
    borderRadius: 4,
  },
  name: {
    flex: 1,
    paddingLeft: 6,
    fontSize: 20,
    fontFamily: "Overpass_700Bold",
  },
  inner: {
    flex: 1,
    paddingTop: 20,
    flexDirection: "row",
  },
  icon: {
    marginTop: 6,
    flex: 1,
    textAlignVertical: "center",
  },
  actions: {
    flexDirection: "column",
  }
});

export default UserHeader;
