import React from "react";
import { StyleSheet, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { UserNavigationProps } from "../../pages/pageProps";
import { UserObject } from "../../api/objectTypes";
import { timeSince } from "../commonUtils";

import Text from "../Base/Text";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ActivityUserProps {
  user: UserObject;
  createdAt: number;
}

const ActivityUser = ({ user, createdAt }: ActivityUserProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const navigation = useNavigation<UserNavigationProps>();

  const toUser = () => {
    if (storeUser?.id === user.id) return;
    navigation.push("User", {
      userId: user.id
    })
  }
  
  if (!user) return <></>;
  return (
    <View style={style.user}>
      <Pressable onPress={toUser}>
        <Image style={style.avatar} source={{ uri: user?.avatar?.medium || "" }} />
      </Pressable>
      <Text style={style.name}>{user!.name}</Text>
      <Text style={style.timeText}>{timeSince(new Date(createdAt * 1000))}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timeText: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
});

export default ActivityUser;
