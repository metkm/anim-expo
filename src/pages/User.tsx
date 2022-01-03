import { Suspense, useState } from "react";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { wrapPromise } from "../api/wrapPromise";
import { getUser } from "../api/user/getUser";
import { getActivities } from "../api/user/getActivities";

import { UserObject } from "../types";
import { UserScreenProps } from "./pageProps";

import Loading from "../components/Loading";
import AnimBanner from "../components/AnimBanner";
import UserSettingsCog from "../components/User/UserSettingsCog";
import UserActivities from "../components/User/UserActivities";
import UserHeader from "../components/User/UserHeader";

interface UserProps {
  reader: () => UserObject;
}

const User = ({ reader }: UserProps) => {
  const user = reader();
  const [activitiesReader] = useState(() => wrapPromise(getActivities, user.id, 1));
  const scrollY = useSharedValue(0);

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
    </>
  );
};

const UserSuspense = ({
  route: {
    params: { userId },
  },
}: UserScreenProps) => {
  const [userReader] = useState(() => wrapPromise(getUser, userId));

  return (
    <Suspense fallback={<Loading />}>
      <User reader={userReader} />
    </Suspense>
  );
};

export default UserSuspense;
