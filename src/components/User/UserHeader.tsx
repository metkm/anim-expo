import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, StyleSheet } from "react-native";
import { UserObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";

// components
import UserStats from "./UserStats";
import Text from "../Base/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface UserHeaderProps {
  user: UserObject
}

const UserHeader = ({ user }: UserHeaderProps) => {
  const { colors } = useColors();

  return (
    <View style={style.content}>
      <Image style={style.banner} source={{ uri: user.bannerImage }} />
      <View style={style.container}>
        <Image style={style.avatar} source={{ uri: user.avatar.large }} />
        <View style={style.inner}>
          <Text style={style.name} numberOfLines={2}>{user.name}</Text>
          <Icon style={style.icon} name="bell" color={colors.text} size={20} />
        </View>
      </View>

      <UserStats user={user} />
      <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.4)" />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    marginBottom: 4,
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
  }
});

export default UserHeader;
