
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
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <View style={styles.statsWrapper}>
          <Text style={[styles.statValue, { color }]}>{user.statistics.anime.count}</Text>
          <Text style={styles.statTitle}>Total Anime</Text>
        </View>
        <View style={styles.statsWrapper}>
          <Text style={[styles.statValue, { color }]}>{(user.statistics.anime.minutesWatched / 1440).toFixed(2)}</Text>
          <Text style={styles.statTitle}>Days Watched</Text>
        </View>
        <View style={styles.statsWrapper}>
          <Text style={[styles.statValue, { color }]}>{(user.statistics.anime.meanScore).toFixed(1)}</Text>
          <Text style={styles.statTitle}>Mean Score</Text>
        </View>
      </View>

      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <View style={styles.statsWrapper}>
          <Text style={[styles.statValue, { color }]}>{user.statistics.manga.count}</Text>
          <Text style={styles.statTitle}>Total Manga</Text>
        </View>
        <View style={styles.statsWrapper}>
          <Text style={[styles.statValue, { color }]}>{user.statistics.manga.chaptersRead}</Text>
          <Text style={styles.statTitle}>Chapters Read</Text>
        </View>
        <View style={styles.statsWrapper}>
          <Text style={[styles.statValue, { color }]}>{(user.statistics.manga.meanScore).toFixed(1)}</Text>
          <Text style={styles.statTitle}>Mean Score</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 8,
    marginTop: 4,
    padding: 6,
    elevation: 1,
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
