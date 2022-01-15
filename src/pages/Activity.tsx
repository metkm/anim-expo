import { FlatList, StyleSheet, View } from "react-native";

import { ActivityScreenProps } from "./pageProps";

import ActivityReply from "../components/Activity/ActivityReply";
import { getRenderElement } from "../components/Activity/getRenderElement";

const Activity = ({
  route: {
    params: { activity },
  },
}: ActivityScreenProps) => {
  return (
    <>
      {getRenderElement(activity, activity.type)}
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
