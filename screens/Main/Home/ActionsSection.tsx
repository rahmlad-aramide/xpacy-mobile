import { ArrowUpRight, GiftSVG } from "@/assets/svgs";
import { COLORS } from "@/constants/Colors";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ActionsProps {
    action: string,
    setAction: React.Dispatch<React.SetStateAction<string>>
}
export const ActionsSection: React.FC<ActionsProps> = ({action, setAction}) => {
    let offsetX = 2; // Example: replace with your dynamic calculation
let offsetY = 4;
let blurRadius = 8;
let shadowColor = 'rgba(0, 0, 0, 0.2)';
let boxShadowStyle;

if (isNaN(offsetX) || isNaN(offsetY) || isNaN(blurRadius)) {
  console.error('Invalid box shadow value (NaN)');
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
                        onPress={()=>setAction(act)}
                        disabled={act === action}
                        className="border border-primary h-10 flex justify-center items-center w-1/2"
                        style={[
                          idx === 0
                            ? { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
                            : { borderTopRightRadius: 8, borderBottomRightRadius: 8 },
                          act === action ? {backgroundColor: COLORS.primary, } : {}
                        ]}
                      >
                        <Text className={`font-unitext ${act === action? 'text-white': 'text-primary'}`}>{act}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {/* TODO: Create referral page and link the button below */}
                  <View style={{boxShadow: boxShadowStyle, borderRadius: 8}}>
                    <TouchableOpacity className="flex gap-4 rounded-lg py-4 px-6 bg-secondary relative overflow-hidden">
                        <View className="flex flex-row justify-between">
                            <GiftSVG />
                            <ArrowUpRight />
                        </View>
                        <View className="flex gap-2">
                            {/* TODO: Change the font-weight to bold */}
                            <Text className="font-unitext text-base text-base-black z-10">Refer Friends and Earn</Text>
                            <Text className="max-w-[90%] font-unitext text-sm z-10">Invite your friends to Xpacy and earn rewards for every successful signup. </Text>
                        </View>
                        <View className="w-[220px] h-[220px] bg-secondary-600 rounded-full absolute right-[-91px] bottom-[-159px]"></View>
                    </TouchableOpacity>
                  </View>
                </View>
    )
}