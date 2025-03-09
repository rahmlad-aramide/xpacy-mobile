import { Empty } from "@/components/Empty";
import { Header } from "@/components/layout/Header";
import { SwipeableNotificationList } from "@/components/NotificationSwipeBox";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotifications } from "@/contexts/NotificationContext";

function Notifications() {
  const {notifications, sortedAndFilteredNotifications, fetchNotifications} = useNotifications()

  useEffect(()=> {
    fetchNotifications()
  },[])
  return (
    <SafeAreaView className="flex-1 pt-2 bg-background">
      <View className="px-6">
        <Header title="Notifications" />
      </View>
      {!notifications || notifications.length === 0 ? (
        <View className="flex-1 justify-center px-6">
          <Empty message="No notification here at the moment!" />
        </View>
      ) : (
        <View className="flex-1">
          <SwipeableNotificationList />
        </View>
      )}
    </SafeAreaView>
  );
}
export default Notifications;
