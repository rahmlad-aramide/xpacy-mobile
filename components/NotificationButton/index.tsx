import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import Badge from "../Badge";
import { NotificaitionSVG } from "@/assets/svgs";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { NotificationNavigationProp } from "@/types";
import { useNotifications } from "@/contexts/NotificationContext";

export const NotificationButton: FC = () => {
  const navigation = useNavigation<NotificationNavigationProp>();
  const {notifications} = useNotifications()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Notifications')}>
      <View className="h-12 w-12 rounded-full flex items-center justify-center border border-primary-200 relative">
        <Badge value={notifications.length} />
        <NotificaitionSVG />
      </View>
    </TouchableOpacity>
  );
};
