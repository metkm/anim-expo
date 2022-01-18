import React, { Suspense, useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";

import { ActivityScreenProps } from "./pageProps";
import { useNavigation } from "@react-navigation/native";

import ActivityComment from "../components/Activity/ActivityComment";
import ActivityReply from "../components/Activity/ActivityReply";
import AnimLoading from "../components/AnimLoading";

import { useColors } from "../hooks/useColors";
import { usePromise } from "../hooks/usePromise";

import { getActivityReplies } from "../api/activity/getActivityReplies";
import { ActivityReplyObject } from "../api/objectTypes";
import { LinearGradient } from "expo-linear-gradient";

interface ActivityProps {
  repliesReader: () => ActivityReplyObject[];
  bannerImage?: string;
  activityId: number;
}

const Activity = ({ repliesReader, bannerImage, activityId }: ActivityProps) => {
  const [replies, setReplies] = useState(() => repliesReader());
  const navigation = useNavigation();
  const { colors } = useColors();

  const addActivity = (reply: ActivityReplyObject) => {
    console.log(reply);
    setReplies(oldReplies => [...oldReplies, reply]);
  }

  useEffect(() => {
    if (bannerImage) {
      navigation.setOptions({
        headerBackground: () => (
          <ImageBackground style={style.gradient} source={{ uri: bannerImage }}>
            <LinearGradient style={style.gradient} colors={["transparent", colors.background]} locations={[0, 1]} />
          </ImageBackground>
        ),
      });
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={replies}
        renderItem={({ item }) => <ActivityReply activityReply={item} />}
        keyExtractor={item => `${item.id}`}
      />

      <ActivityComment activityCallback={addActivity} activityId={activityId} />
    </View>
  );
};

const ActivitySuspense = ({
  route: {
    params: { activityId, bannerImage },
  },
}: ActivityScreenProps) => {
  const [repliesReader] = usePromise(getActivityReplies, activityId, 1);

  return (
    <Suspense fallback={<AnimLoading />}>
      <Activity repliesReader={repliesReader} bannerImage={bannerImage} activityId={activityId} />
    </Suspense>
  );
};

const style = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "100%",
  },
});

export default ActivitySuspense;
