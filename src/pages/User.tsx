import { Suspense, useState } from "react";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { wrapPromise } from "../api/wrapPromise";
import { getUser } from "../api/user/getUser";
import { getActivities } from "../api/user/getActivities";

import { ActivityUnion, UserObject } from "../types";
import { UserScreenProps } from "./pageProps";

import UserSettingsCog from "../components/User/UserSettingsCog";
import ActivityCreate from "../components/Activity/ActivityCreate";
import UserActivities from "../components/User/UserActivities";
import AnimBanner from "../components/AnimBanner";
import UserHeader from "../components/User/UserHeader";
import Loading from "../components/AnimLoading";

import { useSelector } from "react-redux";
import { RootState } from "../store";

interface UserProps {
  userReader: () => UserObject;
  activitiesReader: () => ActivityUnion[];
}

const User = ({ userReader, activitiesReader }: UserProps) => {
  const storeUser = useSelector((state: RootState) => state.user.user);
  const scrollY = useSharedValue(0);
  const user = userReader();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  return (
    <>
      <AnimBanner bannerImage={user.bannerImage} scrollY={scrollY} title={user.name}>
        <UserSettingsCog />
      </AnimBanner>

      <UserActivities
        userId={user.id}
        header={<UserHeader user={user} />}
        scrollHandler={scrollHandler}
        activitiesReader={activitiesReader}
      />

      {storeUser?.id == user.id && <ActivityCreate />}
    </>
  );
};

const UserSuspense = ({
  route: {
    params: { userId },
  },
}: UserScreenProps) => {
  const [userReader] = useState(() => wrapPromise(getUser, userId));
  const [activitiesReader] = useState(() => wrapPromise(getActivities, userId, 1));

  return (
    <Suspense fallback={<Loading />}>
      <User userReader={userReader} activitiesReader={activitiesReader} />
    </Suspense>
  );
};

export default UserSuspense;
