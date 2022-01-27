import React, { memo, Suspense, useCallback, useRef, useState } from "react";
import { FlatListProps, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

import { ActivityUnion } from "../../api/objectTypes";
import { getActivities } from "../../api/user/getActivities";
import { delActivity } from "../../api/activity/delActivity";

import AnimItemSeparator from "../../components/AnimItemSeparator";
import ActivityCreate from "../../components/Activity/ActivityCreate";
import AnimSwipeable from "../../components/AnimSwipeable";
import Loading from "../../components/AnimLoading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getRenderElement } from "../../components/Activity/getRenderElement";
import { usePromise } from "../../hooks/usePromise";

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<ActivityUnion>>(FlatList);

type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
interface UserActivitiesProps {
  activitiesReader: () => ActivityUnion[];
  userId: number;
}

const UserActivities = ({ activitiesReader, userId }: UserActivitiesProps) => {
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
      return <AnimSwipeable options={options}>{element}</AnimSwipeable>;
    }

    return element;
  };

  return (
    <View style={{ flex: 1 }}>
      <AnimatedFlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={AnimItemSeparator}
        refreshing={isRefreshing}
        onRefresh={refreshHandler}
        onEndReached={onEndHandler}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingBottom: 26 }}
        overScrollMode="never"
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
      />

      <ActivityCreate activityCallback={addActivity} recipientId={storeUser?.id !== userId ? userId : undefined} />
    </View>
  );
};


const UserActivitiesSuspense = ({ userId }: { userId: number,  }) => {
  const [activitiesReader] = usePromise(getActivities, userId, 1);

  return (
    <Suspense fallback={<Loading />}>
      <UserActivities activitiesReader={activitiesReader}  userId={userId} />
    </Suspense>
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

export default memo(UserActivitiesSuspense);
