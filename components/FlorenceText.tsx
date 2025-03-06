import { COLORS } from "@/constants/Colors";
import { Text as DefaultText, StyleProp, StyleSheet, TextStyle } from "react-native";
export function FlorenceText({
  children,
  size = "base",
  className,
  fontWeight = 'regular',
  style,
  numberOfLines,
}: {
  children: React.ReactNode;
  size?: string;
  className?: string;
  fontWeight?: 'regular' | 'bold';
  style?: StyleProp<TextStyle>,
  numberOfLines?: number,
}) {
  return (
    <DefaultText
      style={[
        styles.text,
        size === "base"
          ? { fontSize: 22, lineHeight: 31.108 }
          : { fontSize: 14, lineHeight: 16.8 },
        fontWeight === "bold"
          ? { fontFamily: "FlorencesansSC-Bold" }
          : { fontFamily: "FlorencesansSC" },
        style,
      ]}
      className={className}
      numberOfLines={numberOfLines}
    >
      {children}
    </DefaultText>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 31.108,
    color: COLORS.primary,
    textAlign: "left",
    alignSelf: "stretch",
  },
});
