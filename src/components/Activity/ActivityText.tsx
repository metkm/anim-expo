import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import AnimRenderHtml from "../AnimRenderHtml";
import ActivityUser from "./ActivityUser";
import ActivityStats from "./ActivityStats";
import { TextActivityObject } from "../../types";

interface TextActivityProps {
  activity: TextActivityObject;
}

const TextActivity = ({ activity }: TextActivityProps) => {
  const { colors } = useTheme();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <ActivityUser activity={activity} />
      <AnimRenderHtml source={{ html: activity.text }} />
      <ActivityStats activity={activity} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    minHeight: 120,
    padding: 10,
    marginVertical: 3,
  },
});

export default memo(TextActivity);
