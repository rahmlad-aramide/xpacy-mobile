import React from "react";
import { View, Text } from "react-native";

interface NairaProps {
  size?: "sm" | "default";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  className?: string;
  style?: any;
}

export const Naira: React.FC<NairaProps> = ({
  size = "default",
  fontWeight = "normal",
  className = "",
  style,
}) => {
  return (
    <View className={`relative px-1 ${className}`} style={style}>
      <View style={size === 'default' ?{width: '120%'} : { width: '120%'}} className={`h-px left-0.5 bg-secondary-500 absolute top-[45%] ${size === 'default'? 'w-4': 'w-3'}`} />
      <Text
        className={`font-unitext text-secondary-500 ${
          size === "default" ? "text-2xl" : "text-sm"
        }`}
        style={{ fontWeight }}
      >
        N
      </Text>
      <View style={size === 'default' ?{width: '120%'} : { width: '120%'}} className={`h-px left-0.5 bg-secondary-500 absolute top-[60%]`} />
    </View>
  );
};
