import { Text as DefaultText, StyleProp, StyleSheet, TextStyle } from "react-native";
export function FlorenceText({
  children,
  size = "base",
  fontWeight = 'regular',
  style
}: {
  children: React.ReactNode;
  size?: string;
  fontWeight?: 'regular' | 'bold';
  style?: StyleProp<TextStyle>
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
    >
      {children}
    </DefaultText>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 31.108,
    color: "white",
    textAlign: "center",
    alignSelf: "stretch",
  },
});
