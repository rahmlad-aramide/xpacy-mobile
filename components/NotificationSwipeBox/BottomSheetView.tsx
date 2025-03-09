import { View, Text } from "react-native";
import RadioButton from "../Input/RadioButton";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { TActiveNotificationSheet } from "@/types";
import { useNotifications } from "@/contexts/NotificationContext";

export const NotificationBottomSheetView: React.FC<{
  activeSheet: TActiveNotificationSheet;
}> = ({ activeSheet }) => {
  const {sortOption, setSortOption, filterOption, setFilterOption} = useNotifications();
  return (
    <BottomSheetView
    >
      <View className="rounded-lg border border-primary-100 mt-4">
        {activeSheet === "sort" ? (
          <View>
            <RadioButton
              options={[
                "Default",
                "Last 7 days",
                "Last 30 days",
                "Last 90 days",
              ]}
              type="list"
              activeSheet={activeSheet}
              selectedOption={sortOption}
              setSelectedOption={setSortOption}
            />
          </View>
        ) : activeSheet === "filter" ? (
          <View>
            <RadioButton
              options={["General", "Services", "Properties", "Payments"]}
              type="list"
              activeSheet={activeSheet}
              selectedOption={filterOption}
              setSelectedOption={setFilterOption}
            />
          </View>
        ): null}
      </View>
    </BottomSheetView>
  );
};
