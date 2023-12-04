import React, { useEffect } from "react";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationHandler = () => {
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("No notification permissions!");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // Removed the console.log(token) statement

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    };

    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(subscription);
    };
  }, []);
};

export default NotificationHandler;
