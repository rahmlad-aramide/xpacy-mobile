import { ArrowUpRight, GiftSVG } from "@/assets/svgs";
import { COLORS } from "@/constants/Colors";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AnimatedReferralButton } from "./AnimatedReferral";

interface ActionsProps {
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}
export const ActionsSection: React.FC<ActionsProps> = ({
  action,
  setAction,
}) => {
  let offsetX = 2; // Example: replace with your dynamic calculation
  let offsetY = 4;
  let blurRadius = 8;
  let shadowColor = "rgba(0, 0, 0, 0.2)";
  let boxShadowStyle;

  if (isNaN(offsetX) || isNaN(offsetY) || isNaN(blurRadius)) {
    console.error("Invalid box shadow value (NaN)");
  } else {
    boxShadowStyle = `${offsetX}px ${offsetY}px ${blurRadius}px ${shadowColor}`;
  }

  const [actions] = useState(["Buy", "Rent"]);
  return (
    <View className="pt-2 pb-4 flex gap-4">
      <View className="flex flex-row">
        {actions.map((act, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setAction(act)}
            disabled={act === action}
            className="border border-primary h-10 flex justify-center items-center w-1/2"
            style={[
              idx === 0
                ? { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
                : { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
              act === action ? { backgroundColor: COLORS.primary } : {},
            ]}
          >
            <Text
              className={`font-unitextBold ${
                act === action ? "text-white" : "text-primary"
              }`}
            >
              {act}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ boxShadow: boxShadowStyle, borderRadius: 8 }}>
        <AnimatedReferralButton />
      </View>
    </View>
  );
};
