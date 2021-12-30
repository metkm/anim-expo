import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { UserObject } from "../../types";

// components
import Text from "../Base/Text";
import UserStats from "./UserStats";

interface UserHeaderProps {
  user: UserObject
}

const UserHeader = ({ user }: UserHeaderProps) => {
  return (
    <View style={style.content}>
      <View style={style.avatarWrapper}>
        <Image source={{ uri: user.avatar.large }} style={style.avatar} />
        <Text style={style.name}>{user.name}</Text>
      </View>
      <UserStats user={user} />
    </View>
  );
};

const style = StyleSheet.create({
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 4,
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  content: {
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    marginHorizontal: 10,
    fontFamily: "Overpass_700Bold",
  },
});

export default UserHeader;
