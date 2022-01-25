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

import { ActivityUnion } from "../../api/objectTypes";
import { getActivities } from "../../api/user/getActivities";
import { delActivity } from "../../api/activity/delActivity";

import AnimItemSeparator from "../AnimItemSeparator";
import ActivityCreate from "../Activity/ActivityCreate";
import AnimSwipeable from "../AnimSwipeable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getRenderElement } from "../Activity/getRenderElement";

interface UserActivitiesProps {
  userId: number;
  header: JSX.Element;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  activitiesReader: () => ActivityUnion[];
}

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<ActivityUnion>>(FlatList);

// TODO: #11 Make this use hasNextPage from anilist response
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

  const renderItem: ListRenderItem<ActivityUnion> = ({ item, index }) => {
    const element = getRenderElement(item, item.type);

    const options = () => {
      return (
        <Icon
          onPress={() => delActivityHandler(index, item.id)}
          name="delete"
          color="white"
          size={60}
          style={style.icon}
        />
      );
    };

    if (storeUser?.id == userId || ("messenger" in item && item.messenger.id)) {
      return (
        <AnimSwipeable options={options}>
          {element}
        </AnimSwipeable>
      )
    }

    return element;
  };

  return (
    <>
      <AnimatedFlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={AnimItemSeparator}
        ListHeaderComponent={header}
        refreshing={isRefreshing}
        onRefresh={refreshHandler}
        onScroll={scrollHandler}
        onEndReached={onEndHandler}
        onEndReachedThreshold={0.4}
        overScrollMode="never"
      />

      <ActivityCreate activityCallback={addActivity} recipientId={storeUser?.id !== userId ? userId : undefined} />
    </>
  );
};

const style = StyleSheet.create({
  icon: {
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#f43f5e",
    borderRadius: 6,
  },
});

export default UserActivities;
