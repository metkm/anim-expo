import { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActivityLikeNotification } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";

import Text from "../Base/Text";

interface NotificationLikeProps {
  notification: ActivityLikeNotification;
}

const NotificationLike = ({ notification: { context, user } }: NotificationLikeProps) => {
  const { colors, color } = useColors();

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: user.avatar.large }} />
      <View style={[styles.content, { backgroundColor: colors.card }]}>
        <Text>
          <Text style={[styles.name, { color }]}>{user.name}</Text>
          {context}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 4,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 4,
    marginRight: 4,
  },
  content: {
    flex: 1,
    elevation: 1,
    padding: 6,
    borderRadius: 6,
  },
  name: {
    fontFamily: "Overpass_700Bold",
  },
});

export default memo(NotificationLike);
