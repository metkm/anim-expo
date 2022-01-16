import { Suspense, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ActivityScreenProps } from "./pageProps";

import { useNavigation } from "@react-navigation/native";
import { useColors } from "../hooks/useColors";

import ActivityReply from "../components/Activity/ActivityReply";
import AnimLoading from "../components/AnimLoading";

// import { LinearGradient } from "expo-linear-gradient";
import { usePromise } from "../hooks/usePromise";

// import { getActivities } from "../api/user/getActivities";
import { getActivityReplies } from "../api/activity/getActivityReplies";
import { ActivityReplyObject } from "../api/objectTypes";

interface ActivityProps {
  repliesReader: () => ActivityReplyObject[];
}

const Activity = ({ repliesReader }: ActivityProps) => {
  const [replies, setReplies] = useState(() => repliesReader());
  const navigation = useNavigation();
  const { colors } = useColors();

  // useEffect(() => {
  //   if ("media" in activity) {
  //     navigation.setOptions({
  //       headerBackground: () => (
  //         <ImageBackground source={{ uri: activity.media.bannerImage }}>
  //           <LinearGradient style={style.gradient} colors={["transparent", colors.background]} locations={[0, 1]} />
  //         </ImageBackground>
  //       ),
  //     });
  //   }
  // }, []);

  return (
    <FlatList
      data={replies}
      renderItem={({ item }) => <ActivityReply activityReply={item} />}
      keyExtractor={item => `${item.id}`}
    />
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
      <Activity repliesReader={repliesReader} />
    </Suspense>
  );
};

const style = StyleSheet.create({
  gradient: {
    height: "100%",
    width: "100%",
  },
});

export default ActivitySuspense;
