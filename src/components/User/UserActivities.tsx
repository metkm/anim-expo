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
import { getActivities } from "../../api/user/getActivities";
import { AnimRenderBase } from "../AnimRenderHtml";
import { ActivityUnion, ListActivityObject, MessageActivityObject, TextActivityObject } from "../../types";

import ActivityList from "../Activity/ActivityList";
import ActivityText from "../Activity/ActivityText";
import ActivityMessage from "../Activity/ActivityMessage";

interface UserActivitiesProps {
  userId: number;
  header?: JSX.Element;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  activitiesReader: () => ActivityUnion[]
}

const renderItem: ListRenderItem<ActivityUnion> = ({ item }) => {
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
  const [activities, setActivities] = useState(() => activitiesReader());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const page = useRef(1);
  
  const onRefresh = () => {
    setIsRefreshing(true);
    getActivities(userId, 1).then(activities => {
      setActivities(activities);
      setIsRefreshing(false);
      page.current = 2;
    });
  }

  const onEndReach = async () => {
    page.current++;
    const resp = await getActivities(userId, page.current);
    setActivities(activities => [...activities, ...resp]);
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
    </AnimRenderBase>
  )
};

const style = StyleSheet.create({
  flatlist: {
    marginTop: 90,
  },
});

export default memo(UserActivities);
