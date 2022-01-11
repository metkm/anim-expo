
import React from "react";
import { View, StyleSheet } from "react-native";
import { UserObject } from "../../api/objectTypes";

// components
import Text from "../Base/Text";
import { useColors } from "../../hooks/useColors";

interface UserStatsProps {
  user: UserObject;
}

const UserStats = ({ user }: UserStatsProps) => {
  const { color, colors } = useColors();

  return (
    <>
      <View style={[style.container, { backgroundColor: colors.card }]}>
        <View style={style.statsWrapper}>
          <Text style={[style.statValue, { color }]}>{user.statistics.anime.count}</Text>
          <Text style={style.statTitle}>Total Anime</Text>
        </View>
        <View style={style.statsWrapper}>
          <Text style={[style.statValue, { color }]}>{(user.statistics.anime.minutesWatched / 1440).toFixed(2)}</Text>
          <Text style={style.statTitle}>Days Watched</Text>
        </View>
        <View style={style.statsWrapper}>
          <Text style={[style.statValue, { color }]}>{(user.statistics.anime.meanScore).toFixed(1)}</Text>
          <Text style={style.statTitle}>Mean Score</Text>
        </View>
      </View>

      <View style={[style.container, { backgroundColor: colors.card }]}>
        <View style={style.statsWrapper}>
          <Text style={[style.statValue, { color }]}>{user.statistics.manga.count}</Text>
          <Text style={style.statTitle}>Total Manga</Text>
        </View>
        <View style={style.statsWrapper}>
          <Text style={[style.statValue, { color }]}>{user.statistics.manga.chaptersRead}</Text>
          <Text style={style.statTitle}>Chapters Read</Text>
        </View>
        <View style={style.statsWrapper}>
          <Text style={[style.statValue, { color }]}>{(user.statistics.manga.meanScore).toFixed(1)}</Text>
          <Text style={style.statTitle}>Mean Score</Text>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 4,
    padding: 6
  },
  statsWrapper: {
    alignItems: "center",
    flex: 1
  },
  statTitle: {
    marginVertical: 2,
    fontFamily: "Overpass_700Bold",
  },
  statValue: {
    marginVertical: 2,
    fontFamily: "Overpass_700Bold",
  }
});

export default UserStats;
