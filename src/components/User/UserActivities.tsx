import React, { useState, useRef, memo } from "react";
import Animated from "react-native-reanimated";
import {
  FlatList,
  ListRenderItem,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";
import { AnimRenderBase } from "../AnimRenderHtml";

import ActivityMessage from "../Activity/ActivityMessage";
import ActivityCreate from "../Activity/ActivityCreate";
import ActivityList from "../Activity/ActivityList";
import ActivityText from "../Activity/ActivityText";
import ActivityBase from "../Activity/ActivityBase";

import { ActivityUnion, ListActivityObject, MessageActivityObject, TextActivityObject } from "../../api/objectTypes";
import { getActivities } from "../../api/user/getActivities";
import { delActivity } from "../../api/activity/delActivity";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface UserActivitiesProps {
  userId: number;
  header?: JSX.Element;
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

const AnimatedFlatlist = Animated.createAnimatedComponent<FlatListProps<ActivityUnion>>(FlatList);

const UserActivities = ({ userId, header, scrollHandler, activitiesReader }: UserActivitiesProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const [activities, setActivities] = useState(() => activitiesReader());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const page = useRef(1);

  const addActivity = (activity: ActivityUnion) => {
    setActivities(activities => [activity, ...activities]);
  }

  const onRefresh = () => {
    setIsRefreshing(true);
    getActivities(userId, 1).then(activities => {
      setActivities(activities);
      setIsRefreshing(false);
      page.current = 2;
    });
  };

  const onEndReach = async () => {
    page.current++;
    const resp = await getActivities(userId, page.current);
    setActivities(activities => [...activities, ...resp]);
  };

  const renderItem: ListRenderItem<ActivityUnion> = (info) => {
    const delHandler = async () => {
      await delActivity(info.item.id);

      var tempArr = [...activities];
      var mediaIndex = tempArr.findIndex(activity => activity.id == info.item.id);
      tempArr.splice(mediaIndex, 1);

      setActivities(tempArr);
    }

    return (
      <ActivityBase delCallback={delHandler}>
        {renderElement(info)!}
      </ActivityBase>
    )
  }

  return (
    <AnimRenderBase>
      <AnimatedFlatlist
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.2}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={header}
        style={style.flatlist}
        onScroll={scrollHandler}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      />

      {storeUser?.id == userId && <ActivityCreate activityCallback={addActivity} />}
    </AnimRenderBase>
  );
};

const style = StyleSheet.create({
  flatlist: {
    marginTop: 90,
  },
});

export default memo(UserActivities);
