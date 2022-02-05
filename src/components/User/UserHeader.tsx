import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, StyleSheet } from "react-native";
import { UserObject } from "../../api/objectTypes";

import { useColors } from "../../hooks/useColors";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "../../pages/props";

// components
import UserStats from "./UserStats";
import Text from "../Base/Text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface UserHeaderProps {
  user: UserObject,
}

const UserHeader = ({ user }: UserHeaderProps) => {
  const navigation = useNavigation<AppNavigationProps<"Settings" | "Notifications">>();
  const { colors } = useColors();

  const pressHandlerSettings = () => {
    navigation.navigate("Settings");
  };

  const pressHandlerNotifications = () => {
    navigation.navigate("Notifications")
  };

  return (
    <View style={styles.content}>
      <Image style={styles.banner} source={{ uri: user.bannerImage }} />
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: user.avatar.large }} />
        <View style={styles.inner}>
          <Text style={styles.name} numberOfLines={2}>{user.name}</Text>
          <View>
            <Icon style={styles.icon} onPress={pressHandlerNotifications} name="bell" color={colors.text} size={20} />
            <Icon style={styles.icon} onPress={pressHandlerSettings} name="cog" color={colors.text} size={20} />
          </View>
        </View>
      </View>

      <UserStats user={user} />
      <StatusBar style="light" backgroundColor="rgba(0, 0, 0, 0.4)" />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 4,
    marginBottom: 10,
    height: 380,
  },
  banner: {
    height: 180,
    marginHorizontal: -6,
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
    fontSize: 22,
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
