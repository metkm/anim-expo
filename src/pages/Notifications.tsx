import { Suspense, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

import { NotificationUnion } from "../api/objectTypes";
import { getNotifications } from "../api/user/getNotifications";

import { getNotificationElement } from "../components/Notifications/getNotificationElement";
import AnimItemSeparator from "../components/AnimItemSeparator";
import Loading from "../components/AnimLoading";

import { usePromise } from "../hooks/usePromise";

interface NotificationsProps {
  notificationsReader: () => NotificationUnion[];
}

const Notifications = ({ notificationsReader }: NotificationsProps) => {
  const [notifications, setNotifications] = useState(() => notificationsReader());
  const page = useRef(1);

  const onEndReach = async () => {
    page.current++;
    const resp = await getNotifications(page.current);
    setNotifications(notifications => [...notifications, ...resp]);
  }

  return (
    <FlatList 
      data={notifications}
      renderItem={getNotificationElement}
      keyExtractor={item => `${item.id}`}
      ItemSeparatorComponent={AnimItemSeparator}
      onEndReachedThreshold={0.4}
      onEndReached={onEndReach}
    />
  )
}

const NotificationsSuspense = () => {
  const [notificationsReader] = usePromise(getNotifications, 1);

  return (
    <Suspense fallback={<Loading />}>
      <Notifications notificationsReader={notificationsReader} />
    </Suspense>
  )
}

export default NotificationsSuspense;
