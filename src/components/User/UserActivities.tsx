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

import { getActivities } from "../../api/user/getActivities";
import { ActivityUnion, ListActivityObject, MessageActivityObject, TextActivityObject } from "../../api/objectTypes";

import ActivityMessage from "../Activity/ActivityMessage";
import ActivityCreate from "../Activity/ActivityCreate";
import ActivityList from "../Activity/ActivityList";
import ActivityText from "../Activity/ActivityText";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ActivityBase from "../Activity/ActivityBase";

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
  const page = useRef(2);

  const addActivity = (activity: ActivityUnion) => {
    setActivities(activities => [activity, ...activities]);
  };

  const delActivity = (index: number) => {
    var tempActivities = [...activities];
    tempActivities.splice(index, 1);
    setActivities(tempActivities);
  }

  const refreshHandler = useCallback(async () => {
    setIsRefreshing(true);
    const activities = await getActivities(userId, 1);
    setActivities(activities);
    setIsRefreshing(false);
  }, []);

  const onEndHandler = async () => {
    const resp = await getActivities(userId, page.current);
    setActivities(activities => [...activities, ...resp]);
    page.current++;
  };

  const renderItem: ListRenderItem<ActivityUnion> = (info) => {
    return (
      <ActivityBase index={info.index} delCallback={delActivity}>
        {renderElement(info)!}
      </ActivityBase>
    )
  }

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
});

export default UserActivities;

//   const renderItem: ListRenderItem<ActivityUnion> = (info) => {
//     const delHandler = async () => {r
//       await delActivity(info.item.id);

//       var tempArr = [...activities];
//       var mediaIndex = tempArr.findIndex(activity => activity.id == info.item.id);
//       tempArr.splice(mediaIndex, 1);

//       setActivities(tempArr);
//     }

//     return (
//       <ActivityBase delCallback={delHandler}>
//         {renderElement(info)!}
//       </ActivityBase>
//     )
//   }

//   return (
//     <>
//       <AnimatedFlatlist
//         data={activities}
//         renderItem={renderItem}
//         keyExtractor={item => `${item.id}`}
//         onEndReached={onEndReach}
//         onEndReachedThreshold={0.2}
//         refreshing={isRefreshing}
//         onRefresh={onRefresh}
//         ListHeaderComponent={header}
//         style={style.flatlist}
//         onScroll={scrollHandler}
//         overScrollMode="never"
//         showsVerticalScrollIndicator={false}
//       />

//       {storeUser?.id == userId && <ActivityCreate activityCallback={addActivity} />}
//     </>
//   );
// };

// const style = StyleSheet.create({
//   flatlist: {
//     marginTop: 90,
//   },
// });

// export default memo(UserActivities);
