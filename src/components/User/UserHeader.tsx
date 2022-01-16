import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { UserObject } from "../../api/objectTypes";

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
        <Text style={style.name} numberOfLines={2}>{user.name}</Text>
      </View>
      <UserStats user={user} />
    </View>
  );
};

const style = StyleSheet.create({
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 4,
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  content: {
    marginBottom: 6,
  },
  name: {
    flex: 1,
    height: "55%",
    fontSize: 24,
    fontFamily: "Overpass_700Bold",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

export default UserHeader;
