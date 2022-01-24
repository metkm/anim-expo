import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserObject } from "../../api/objectTypes";

// components
import Text from "../Base/Text";
import UserStats from "./UserStats";

interface UserHeaderProps {
  user: UserObject
}

const UserHeader = ({ user }: UserHeaderProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[style.content, { marginTop: top }]}>
      <Image style={style.banner} source={{ uri: user.bannerImage }} />
      <View style={style.container}>
        <Image style={style.avatar} source={{ uri: user.avatar.large }} />
        <Text style={style.name} numberOfLines={2}>{user.name}</Text>
      </View>

      <UserStats user={user} />
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    padding: 4,
  },
  banner: {
    height: 120,
    borderRadius: 6,
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
    paddingTop: 20,
    paddingLeft: 6,
    fontSize: 20,
    fontFamily: "Overpass_700Bold",
  }
});

export default UserHeader;
