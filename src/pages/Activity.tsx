import React, { Suspense, useEffect, useState } from "react";
import { FlatList, ImageBackground, ListRenderItem, StyleSheet, View } from "react-native";

import { ActivityScreenProps } from "./pageProps";
import { useNavigation } from "@react-navigation/native";

import ActivityComment from "../components/Activity/ActivityComment";
import AnimSwipeable from "../components/AnimSwipeable";
import ActivityReply from "../components/Activity/ActivityReply";
import AnimLoading from "../components/AnimLoading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useColors } from "../hooks/useColors";
import { usePromise } from "../hooks/usePromise";

import { ActivityReplyObject } from "../api/objectTypes";
import { getActivityReplies } from "../api/activity/getActivityReplies";
import { delActivityReply } from "../api/activity/delActivityReply";

import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AnimItemSeparator from "../components/AnimItemSeparator";

interface ActivityProps {
  repliesReader: () => ActivityReplyObject[];
  bannerImage?: string;
  activityId: number;
}

const Activity = ({ repliesReader, bannerImage, activityId }: ActivityProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const [replies, setReplies] = useState(() => repliesReader());
  const navigation = useNavigation();
  const { colors } = useColors();

  const addActivity = (reply: ActivityReplyObject) => {
    setReplies(oldReplies => [...oldReplies, reply]);
  };

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

  const delReplyHandler = async (index: number, id: number) => {
    await delActivityReply(id);

    var tmpArray = [...replies];
    tmpArray.splice(index, 1);
    setReplies(tmpArray);
  };

  const renderItem: ListRenderItem<ActivityReplyObject> = ({ item, index }) => {
    if (storeUser?.id !== item.user.id) return <ActivityReply activityReply={item} />;

    const options = () => {
      return (
        <Icon
          onPress={() => delReplyHandler(index, item.id)}
          name="delete"
          color="white"
          size={60}
          style={style.icon}
        />
      );
    };

    return (
      <AnimSwipeable options={options}>
        <ActivityReply activityReply={item} />
      </AnimSwipeable>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <FlatList
        data={replies}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={AnimItemSeparator}
        style={style.flatlist}
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
  icon: {
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f43f5e",
  },
  flatlist: {
    // flex: 1,
  },
});

export default ActivitySuspense;
