import React, { useEffect, useState, useRef } from "react";
import Animated from "react-native-reanimated";
import {
  FlatList,
  ListRenderItem,
  View,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";
import { getActivities } from "../../api/user/getActivities";
import { activitiesQuery } from "../../graphql/queries/ActivitiesQuery";
import {
  ActivityUnion,
  ListActivityObject,
  MessageActivityObject,
  ResponseActivities,
  TextActivityObject,
} from "../../types";

import ActivityList from "../Activity/ActivityList";
import ActivityText from "../Activity/ActivityText";
import ActivityMessage from "../Activity/ActivityMessage";

interface UserActivitiesProps {
  userId: number;
  header?: JSX.Element;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
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
const UserActivities = ({ userId, header, scrollHandler }: UserActivitiesProps) => {
  const [activities, setActivities] = useState<ActivityUnion[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const page = useRef(1);

  const onEndReach = async () => {
    page.current++;
    const resp = await getActivities(userId, page.current);
    setActivities(activities => [...activities, ...resp.data.data.Page.activities]);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    const resp = await getActivities(userId, 1);
    setActivities(resp.data.data.Page.activities);
    page.current = 2;
    setIsRefreshing(false);
  };

  useEffect(() => {
    getActivities(userId, page.current).then(resp => {
      setActivities(resp.data.data.Page.activities);
      page.current++;
    });
  }, []);

  return (
    <AnimatedFlatlist
      data={activities}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={header}
      style={style.flatlist}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"

      onEndReached={onEndReach}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
};

const style = StyleSheet.create({
  flatlist: {
    marginTop: 90,
  }
})

export default UserActivities;
