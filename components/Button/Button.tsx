import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../../constants/theme";
import { useTheme } from "@react-navigation/native";
import { COLORS } from "@/constants/Colors";

interface ButtonProps {
  title: string;
  color?: string;
  onPress: ()=>void;
  style?: unknown;
  size?: 'sm'|'md'|'lg';
  badge?: any;
  btnRounded?: boolean;
  text?: boolean;
  icon?: any;
  fullWidth?: boolean;
  outline?: boolean;
  height?: any;
}
const Button = ({
  title,
  color,
  onPress,
  style,
  size,
  badge,
  btnRounded,
  text = true,
  icon,
  fullWidth = true,
  outline,
  height,
}: ButtonProps) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onPress && onPress()}
      style={[
        {
          height: 48,
          paddingHorizontal: 25,
          paddingVertical: 13,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: btnRounded ? 30 : 8,
          backgroundColor: color
            ? COLORS.primary
            : outline
            ? colors.card
            : COLORS.primary,
          borderWidth: outline ? 1 : null,
          borderColor: COLORS.primary,
        },
        size === "sm" && {
          paddingHorizontal: 15,
          paddingVertical: 10,
          height: height ? 36 : 40,
          borderRadius: 6,
          marginVertical: 5,
          marginRight: 10,
        },
        size === "lg" && {
          paddingHorizontal: 35,
          paddingVertical: 16,
          height: 58,
        },
        icon && {
          paddingLeft: 65,
          paddingRight: fullWidth ? 65 : 25,
        },
        style && { ...style },
      ]}
    >
      {icon && (
        <View
          style={{
            height: outline ? 48 : 55,
            width: outline ? 48 : 55,
            borderRadius: 55,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: outline
              ? '#FFFFFF00'
              : theme.dark
              ? COLORS.title
              : COLORS.white,
            borderWidth: outline ? 0 : 2,
            borderColor: color ? color : outline ? COLORS.primary : COLORS.primary,
            position: "absolute",
            left: 0,
          }}
        >
          {icon}
        </View>
      )}
      <Text
        style={[
          {
            ...FONTS.font,
            fontSize: 18,
            textAlign: "center",
            color: text
              ? 'white'
              : '#203645'
          },
          size === "sm" && {
            fontSize: 14,
          },
          size === "lg" && {
            fontSize: 18,
          },
          outline && {
            ...FONTS.font,
          },
        ]}
      >
        {title}
      </Text>
      {badge && (
        <View style={{ marginVertical: -4, marginLeft: 8 }}>{badge()}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
