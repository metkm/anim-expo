import React, { useState, useEffect } from "react";
import { getUser } from "../api/user/getUser";
import { ImageBackground, StyleSheet, StatusBar } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from "react-native-reanimated";

import { useSelector } from "react-redux";
import { RootState } from "../store";

import { UserObject } from "../types";
import { UserScreenProps } from "./pageProps";

import LoginButton from "../components/LoginButton";
import Loading from "../components/Loading";
import AnimBanner from "../components/AnimBanner";
import UserSettingsCog from "../components/User/UserSettingsCog";
import UserActivities from "../components/User/UserActivities";
import UserHeader from "../components/User/UserHeader";

const User = ({
  route: {
    params: { userId },
  },
}: UserScreenProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const [user, setUser] = useState<UserObject>();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (!userId) return;
    getUser(userId).then(setUser);
  }, [userId]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    var statusBarHeight = StatusBar.currentHeight!;

    return {
      height: interpolate(scrollY.value, [0, statusBarHeight * 2], [150, 150 - statusBarHeight * 2], Extrapolate.CLAMP)
    }
  })

  if (!userId || !storeUser) return <LoginButton />;
  if (!user) return <Loading />;

  return (
    <>
      <AnimBanner bannerImage={user.bannerImage} scrollY={scrollY} />
      {/* <Animated.Image source={{ uri: user.bannerImage }} style={[style.banner, animatedStyle]} /> */}
      <UserSettingsCog />

      <UserActivities 
        userId={userId}
        header={
          <UserHeader user={user} />
        }
        scrollHandler={scrollHandler}
      />
    </>
  ) 
};

const style = StyleSheet.create({
  banner: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 150,
  }
})

export default User;


//   useEffect(() => {
//     if (!route.params.userId) return;
//     getUser();
//   }, [storeUser, route.params.userId]);

//   if (!route.params.userId || !storeUser) return <LoginButton />;
//   if (!user) return <Loading />;

//   return (
//     <View style={style.container}>
//       <AnimBanner bannerImage={user.bannerImage}>
//         <UserSettingsCog />
//       </AnimBanner>

//       <UserActivities userId={user.id} header={<UserHeader user={user} />} />

//       {storeUser.id == user.id && <ActivityCreate />}
//     </View>
//   )
// };

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   cogWrapper: {
//     position: "absolute",
//     right: 20,
//     top: 50,
//     zIndex: 10,
//     padding: 10,
//     backgroundColor: "rgba(0, 0, 0, 0.4)",
//     borderRadius: 1000,
//   },
// });

// export default User;
