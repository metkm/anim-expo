import { Suspense, useState } from "react";
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
  const [notifications] = useState(() => notificationsReader());

  return (
    <FlatList 
      data={notifications}
      renderItem={getNotificationElement}
      keyExtractor={item => `${item.id}`}
      ItemSeparatorComponent={AnimItemSeparator}
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
