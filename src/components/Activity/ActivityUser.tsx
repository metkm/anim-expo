import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { MessageActivityObject, TextActivityObject, UserObject } from "../../types";
import { timeSince } from "../commonUtils";

import Text from "../Base/Text";

interface ActivityUserProps {
  activity: TextActivityObject | MessageActivityObject,
}

const ActivityUser = ({ activity }: ActivityUserProps) => {
  let user: UserObject;
  if ("user" in activity) {
    user = activity.user;
  } else if ("messenger" in activity) {
    user = activity.messenger
  }

  return (
    <View style={style.user}>
      <Image style={style.avatar} source={{ uri: user!.avatar.medium }} />
      <Text style={style.name}>{user!.name}</Text>
      <Text style={style.timeText}>{timeSince(new Date(activity.createdAt * 1000))}</Text>
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
