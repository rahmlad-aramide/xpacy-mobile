import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Reanimated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { INotification } from "@/types";
import { COLORS } from "@/constants/Colors";
import { BookedServicesSmallSVG, DeleteIconSVG } from "@/assets/svgs";
import { useNotifications } from "@/contexts/NotificationContext";

interface NotificationItemProps {
  item: INotification;
  deletingId: string | null;
  setDeleting: (id: string | null) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  deletingId,
  setDeleting,
}) => {
  const { id, body, date, title } = item;
  const { removeNotification } = useNotifications();

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>,
    { close }: { close: () => void }
  ) => {
    const handlePressDelete = () => {
      setDeleting(id);
      close();
      removeNotification(id);
    };

    const styleAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + (prog.value <= 0.5 ? 104 : 100) }],
    }));

    return (
      <Reanimated.View style={styleAnimation} className="w-[104px] h-full">
        <TouchableOpacity
          onPress={handlePressDelete}
          className="bg-error h-full w-full rounded-r-xl justify-center items-center"
        >
          <DeleteIconSVG />
        </TouchableOpacity>
      </Reanimated.View>
    );
  };

  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={104}
      renderRightActions={RightAction}
      containerStyle={{ position: "relative" }}
    >
      <View className="flex-row gap-2 p-4 border border-primary-100 bg-white rounded-lg"
      >
        <View className="h-8 w-8 rounded-full flex items-center justify-center border border-primary-200 relative">
          <View className="bg-primary-100 rounded-full h-6 w-6 flex items-center justify-center">
            <BookedServicesSmallSVG />
          </View>
        </View>
        <View className="flex-1 gap-2">
          <Text className="font-unitext text-sm text-base-black">{title}</Text>
          <Text className="font-unitext text-sm text-base-black">{body}</Text>
          <Text className="font-unitext text-sm text-neutral-700">{date}</Text>
        </View>
      </View>

      {/* ✅ Show Activity Indicator Only on the Deleting Item */}
      {deletingId === id && (
        <View className="absolute h-full w-full bg-white/50 flex items-center justify-center">
          <ActivityIndicator color={COLORS.primary} />
        </View>
      )}
    </ReanimatedSwipeable>
  );
};
