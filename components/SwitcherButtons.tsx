import { COLORS } from "@/constants/Colors";
import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ISwitcherButton<T extends string> {
  options: T[];
  selectedOption: T;
  setSelectedOption: Dispatch<SetStateAction<T>>;
}
export const SwitcherButtons = <T extends string>({
  options,
  selectedOption,
  setSelectedOption,
}: ISwitcherButton<T>) => {
  return (
    <View className="flex flex-row">
      {options.map((act, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => setSelectedOption(act)}
          disabled={act === selectedOption}
          className="border border-primary h-10 flex justify-center items-center w-1/2"
          style={[
            idx === 0
              ? { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
              : { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
            act === selectedOption ? { backgroundColor: COLORS.primary } : {},
          ]}
        >
          <Text
            className={`font-unitextBold ${
              act === selectedOption ? "text-white" : "text-primary"
            }`}
          >
            {act}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
