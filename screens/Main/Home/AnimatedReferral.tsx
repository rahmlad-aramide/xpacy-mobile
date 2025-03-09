import { ArrowUpRight, GiftSVG } from "@/assets/svgs";
import { ReferralNavigationProp } from "@/types";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";

const primaryColor = "#73A0BE";
const secondaryColor = "#CDB385";
const primaryDarkerColor = "#578DB1";
const secondaryDarkerColor = "#B6904E";
const initialTextColor = "#333333";
const whiteColor = "#ffffff";

export const AnimatedReferralButton = () => {
  const navigation = useNavigation<ReferralNavigationProp>();
  const [isPrimary, setIsPrimary] = useState(false);
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const circleBackgroundColor = useRef(new Animated.Value(0)).current;
  const textColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPrimary((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isPrimary ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(circleBackgroundColor, {
      toValue: isPrimary ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(textColor, {
      toValue: isPrimary ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isPrimary, backgroundColor, circleBackgroundColor, textColor]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [secondaryColor, primaryColor],
  });

  const interpolatedCircleBackgroundColor = circleBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [secondaryDarkerColor, primaryDarkerColor],
  });

  const interpolatedTextColor = textColor.interpolate({
    inputRange: [0, 1],
    outputRange: [initialTextColor, whiteColor],
  });
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Referral")}>
      <Animated.View
        style={[
          {
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
          },
          { backgroundColor: interpolatedBackgroundColor },
        ]}
        className="flex gap-4 rounded-lg py-4 px-6 relative overflow-hidden"
      >
        <View className="flex flex-row justify-between">
          <GiftSVG color={interpolatedTextColor} />
          <ArrowUpRight color={interpolatedTextColor} />
        </View>
        <View className="flex gap-2">
          <Animated.Text
            style={{ color: interpolatedTextColor }}
            className="font-unitextBold text-base z-10"
          >
            Refer Friends and Earn
          </Animated.Text>
          <Animated.Text
            style={{ color: interpolatedTextColor }}
            className="max-w-[90%] font-unitext text-sm z-10"
          >
            Invite your friends to Xpacy and earn rewards for every successful
            signup.
          </Animated.Text>
        </View>
        <Animated.View
          style={[
            {
              width: 220,
              height: 220,
              borderRadius: 110,
              position: "absolute",
              right: -91,
              bottom: -159,
            },
            { backgroundColor: interpolatedCircleBackgroundColor },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
