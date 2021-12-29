import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FlatList, ListRenderItem, View, StatusBar, FlatListProps, Animated, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
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
  // scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
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

const getActivities = async (userId: number, page: number) => {
  const resp = await axios.post<ResponseActivities>("/", {
    query: activitiesQuery,
    variables: {
      id: userId,
      page: page,
    },
  });

  return resp;
};

const UserActivities = ({ userId, header }: UserActivitiesProps) => {
  const [activities, setActivities] = useState<ActivityUnion[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const scrollY = useRef(new Animated.Value(0));
  const page = useRef(1);

  useEffect(() => {
    console.log(scrollY)
  }, [scrollY])

  const onEndReach = async () => {
    // page.current++;
    // const resp = await getActivities(userId, page.current);
    // setActivities(activities => [...activities, ...resp.data.data.Page.activities]);
  };

  const onRefresh = async () => {
    // setIsRefreshing(true);
    // const resp = await getActivities(userId, 1);
    // setActivities(resp.data.data.Page.activities);
    // page.current = 2;
    // setIsRefreshing(false);
  };

  useEffect(() => {
    getActivities(userId, page.current).then(resp => {
      setActivities(resp.data.data.Page.activities);
      // page.current++;
    });
  }, []);

  const flatlistStyle: ViewStyle = {
    marginTop: 100,
    // paddingTop: 80,
  }

  return (
    <Animated.FlatList
      data={activities}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={header}
      style={flatlistStyle}
      onScroll={Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              y: scrollY.current
            }
          }
        }
      ], { useNativeDriver: false })}

      ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      showsVerticalScrollIndicator={false}

      onEndReached={onEndReach}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />

    // <FlatList
    //   data={activities}
    //   renderItem={renderItem}
    //   keyExtractor={item => item.id.toString()}
    //   ListHeaderComponent={header}
    //   ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
    //   style={{
    //     flex: 1,
    //     marginTop: 100,
    //     paddingTop: 30
    //   }}
    //   onEndReached={onEndReach}
    //   onRefresh={onRefresh}
    //   refreshing={isRefreshing}
    //   contentContainerStyle={{ paddingHorizontal: 10 }}
    // />
  );
};

export default UserActivities;
