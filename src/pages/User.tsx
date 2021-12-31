import React, { useState, useEffect } from "react";
import { getUser } from "../api/user/getUser";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { TRenderEngineProvider, RenderHTMLConfigProvider } from "react-native-render-html";
import { customHTMLElementModels, renderers, tagStyles } from "../components/AnimRenderHtml";

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
import { useColors } from "../hooks/useColors";

const User = ({
  route: {
    params: { userId },
  },
}: UserScreenProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const [user, setUser] = useState<UserObject>();
  const { colors } = useColors();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    if (!userId) return;
    getUser(userId).then(setUser);
  }, [userId]);

  useEffect(() => {
    if (!storeUser) return;
    setUser(storeUser);
  }, [storeUser]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  if (!userId || !storeUser) return <LoginButton />;
  if (!user || user.id != userId) return <Loading />;

  return (
    <>
      <AnimBanner bannerImage={user.bannerImage} scrollY={scrollY} title={user.name}>
        <UserSettingsCog />
      </AnimBanner>

      <UserActivities userId={userId} header={<UserHeader user={user} />} scrollHandler={scrollHandler} />
    </>
  );
};

export default User;
