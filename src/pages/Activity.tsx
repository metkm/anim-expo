import { FlatList, StyleSheet, View } from "react-native";

import { TextActivityObject } from "../api/objectTypes";
import { ActivityScreenProps } from "./pageProps";

import ActivityText from "../components/Activity/ActivityText";
import ActivityReply from "../components/Activity/ActivityReply";

const Activity = ({
  route: {
    params: { activity },
  },
}: ActivityScreenProps) => {
  return (
    <>
      <ActivityText activity={activity as TextActivityObject} />
      <View style={style.comments}>
        <FlatList 
          data={activity.replies}
          renderItem={({ item }) => <ActivityReply activityReply={item} />}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </>
  )
};

const style = StyleSheet.create({
  comments: {
    marginTop: 20,
  }
});

export default Activity;
