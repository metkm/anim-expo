import React, { Suspense, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { ActivityScreenProps } from "./props";

import AnimItemSeparator from "../components/AnimItemSeparator";
import ActivityComment from "../components/Activity/ActivityComment";
import AnimSwipeable from "../components/AnimSwipeable";
import ActivityReply from "../components/Activity/ActivityReply";
import AnimLoading from "../components/AnimLoading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { usePromise } from "../hooks/usePromise";
import { ActivityReplyObject } from "../api/objectTypes";
import { getActivityReplies } from "../api/activity/getActivityReplies";
import { delActivityReply } from "../api/activity/delActivityReply";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

interface ActivityProps {
  repliesReader: () => ActivityReplyObject[];
  activityId: number;
}

const Activity = ({ repliesReader, activityId }: ActivityProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const [replies, setReplies] = useState(() => repliesReader());
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const addActivity = (reply: ActivityReplyObject) => {
    setReplies(oldReplies => [...oldReplies, reply]);
  };

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
    <View style={{ flex: 1, justifyContent: "space-between", paddingTop: headerHeight }}>
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
    params: { activityId },
  },
}: ActivityScreenProps) => {
  const [repliesReader] = usePromise(getActivityReplies, activityId, 1);

  return (
    <Suspense fallback={<AnimLoading />}>
      <Activity repliesReader={repliesReader} activityId={activityId} />
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
    borderRadius: 6,
  },
  flatlist: {
    // flex: 1,
  },
});

export default ActivitySuspense;
