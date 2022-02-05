import React from "react";
import { StyleSheet, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "../../pages/props";

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
  const navigation = useNavigation<AppNavigationProps<"User">>();

  const toUser = () => {
    if (storeUser?.id === user.id) return;
    navigation.push("User", {
      userId: user.id
    })
  }
  
  if (!user) return <></>;
  return (
    <View style={styles.user}>
      <Pressable onPress={toUser}>
        <Image style={styles.avatar} source={{ uri: user?.avatar?.medium || "" }} />
      </Pressable>
      <Text style={styles.name}>{user!.name}</Text>
      <Text style={styles.timeText}>{timeSince(new Date(createdAt * 1000))}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
