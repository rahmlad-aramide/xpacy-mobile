import {
  DoubleTickSVG,
  FilterIconSVG,
  SortIconSVG,
} from "@/assets/svgs";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UnitextBold } from "../Unitext";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import {
  INotificationItemProps,
  TActiveNotificationSheet,
} from "@/types";
import { NotificationBottomSheetView } from "./BottomSheetView";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "@/contexts/NotificationContext";
import { Empty } from "../Empty";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const SwipeableNotificationList = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [240], []);
  const [activeSheet, setActiveSheet] =
    useState<TActiveNotificationSheet>("sort");
  const [deletingId, setDeleting] = useState<string | null>(null);
  const {sortedAndFilteredNotifications, clearNotifications} = useNotifications();
  const {width} = useWindowDimensions();

  const RenderItemComponent = ({
    item,
    deletingId,
    setDeleting,
  }: INotificationItemProps) => {
    return (
      <View className="px-6">
        <NotificationItem
          item={item}
          deletingId={deletingId}
          setDeleting={setDeleting}
          />
      </View>
    );
  };

  const ListHeaderComponent = () => (
    <View className="flex-row justify-between pb-2 px-6">
      <TouchableOpacity
        onPress={() => {}}
        className="flex-row items-center gap-2"
      >
        <DoubleTickSVG />
        <Text className="text-secondary-700 font-unitextBold">
          Mark as read
        </Text>
      </TouchableOpacity>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => {
            setActiveSheet("sort");
            bottomSheetRef.current?.expand();
          }}
          className="h-12 w-12 items-center justify-center"
        >
          <SortIconSVG />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveSheet("filter");
            bottomSheetRef.current?.expand();
          }}
          className="h-12 w-12 items-center justify-center"
        >
          <FilterIconSVG />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListFooterComponent = () => (
    <View className="flex-1 justify-end items-end mt-5 mb-8 px-6">
      <TouchableOpacity onPress={clearNotifications}>
        <UnitextBold className="text-sm underline">
          Clear All Notifications
        </UnitextBold>
      </TouchableOpacity>
    </View>
  );

  const ListEmptyComponent = () => (
    <View className="flex-1 justify-center px-6">
      <Empty message="No results match your filter criteria" />
    </View>
  )
  return (
    <GestureHandlerRootView className="flex-1">
      <FlatList
        data={sortedAndFilteredNotifications}
        keyExtractor={(_, idx) => `${idx}`}
        renderItem={({ item }) => (
          <RenderItemComponent
            item={item}
            deletingId={deletingId}
            setDeleting={setDeleting}
          />
        )}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-2.5"></View>}
      />
      <BottomSheet
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        index={-1}
        handleIndicatorStyle={{
          width: 60,
          backgroundColor: "#A2A2A2",
          height: 3,
          marginTop: 6,
        }}
        style = {{
          paddingHorizontal: 24
        }}
        backgroundStyle={{
          backgroundColor: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderWidth: 1,
          borderColor: "#E0E0E0",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 8,
          width,
        }}
      >
        <NotificationBottomSheetView activeSheet={activeSheet} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};
