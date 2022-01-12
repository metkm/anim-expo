import { Suspense, useState } from "react";
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { usePromise } from "../hooks/usePromise";
import { UserScreenProps } from "./pageProps";

import { getUser } from "../api/user/getUser";
import { getActivities } from "../api/user/getActivities";
import { UserObject } from "../api/objectTypes";

import UserSettingsCog from "../components/User/UserSettingsCog";
import UserActivities from "../components/User/UserActivities";
import AnimBanner from "../components/AnimBanner";
import UserHeader from "../components/User/UserHeader";
import Loading from "../components/AnimLoading";
import { AnimRenderBase } from "../components/AnimRenderHtml";

interface UserProps {
  userReader: () => UserObject;
  userId: number;
}

const User = ({ userReader, userId }: UserProps) => {
  const [activitiesReader] = usePromise(getActivities, userId, 1);
  const [user] = useState(() => userReader());
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

      <AnimRenderBase>
        <UserActivities
          userId={user.id}
          header={<UserHeader user={user} />}
          scrollHandler={scrollHandler}
          activitiesReader={activitiesReader}
        />
      </AnimRenderBase>
    </>
  );
};

const UserSuspense = ({
  route: {
    params: { userId },
  },
  
}: UserScreenProps) => {
  const [userReader] = usePromise(getUser, userId);

  return (
    <Suspense fallback={<Loading />}>
      <User userReader={userReader} userId={userId} />
    </Suspense>
  );
};

export default UserSuspense;
