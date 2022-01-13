import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";

import { ActivityUnion, ListActivityObject, MessageActivityObject, TextActivityObject } from "../../api/objectTypes";
import { getActivities } from "../../api/user/getActivities";
import { delActivity } from "../../api/activity/delActivity";

import ActivityMessage from "../Activity/ActivityMessage";
import ActivityCreate from "../Activity/ActivityCreate";
import ActivityList from "../Activity/ActivityList";
import ActivityText from "../Activity/ActivityText";
import AnimSwipeable from "../AnimSwipeable";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface UserActivitiesProps {
  userId: number;
  header: JSX.Element;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  activitiesReader: () => ActivityUnion[];
}

const renderElement: ListRenderItem<ActivityUnion> = ({ item }) => {
  switch (item.type) {
    case "ANIME_LIST":
      return <ActivityList activity={item as ListActivityObject} />;
    case "MANGA_LIST":
      return <ActivityList activity={item as ListActivityObject} />;
    case "TEXT":
      return <ActivityText activity={item as TextActivityObject} />;
    case "MESSAGE":
      return <ActivityMessage activity={item as MessageActivityObject} />;
    default:
      return <></>;
  }
};

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<ActivityUnion>>(FlatList);

const UserActivities = ({ activitiesReader, scrollHandler, userId, header }: UserActivitiesProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const [activities, setActivities] = useState(() => activitiesReader());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const page = useRef(1);

  const addActivity = (activity: ActivityUnion) => {
    setActivities(activities => [activity, ...activities]);
  };

  const delActivityHandler = async (index: number, id: number) => {
    await delActivity(id);

    var tempActivities = [...activities];
    tempActivities.splice(index, 1);
    setActivities(tempActivities);
  };

  const refreshHandler = useCallback(async () => {
    setIsRefreshing(true);
    const activities = await getActivities(userId, 1);
    setActivities(activities);
    page.current = 2;
    setIsRefreshing(false);
  }, []);

  const onEndHandler = async () => {
    page.current++;
    const resp = await getActivities(userId, page.current);
    setActivities(activities => [...activities, ...resp]);
  };

  const renderItem: ListRenderItem<ActivityUnion> = info => {
    const options = () => {
      return (
        <Icon
          onPress={() => delActivityHandler(info.index, info.item.id)}
          name="delete"
          color="white"
          size={60}
          style={style.icon}
        />
      );
    };

    return (
      <AnimSwipeable options={options} style={{ marginVertical: 3 }}>
        {renderElement(info)!}
      </AnimSwipeable>
    );
  };

  return (
    <>
      <AnimatedFlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={header}
        refreshing={isRefreshing}
        onRefresh={refreshHandler}
        onScroll={scrollHandler}
        onEndReached={onEndHandler}
        onEndReachedThreshold={0.4}
        style={style.flatlist}
        overScrollMode="never"
      />

      {storeUser?.id == userId && <ActivityCreate activityCallback={addActivity} />}
    </>
  );
};

const style = StyleSheet.create({
  flatlist: {
    marginTop: 90,
  },
  icon: {
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f43f5e",
  },
});

export default UserActivities;
