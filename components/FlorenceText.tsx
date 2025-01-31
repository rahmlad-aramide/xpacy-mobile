import { Text as DefaultText, StyleProp, StyleSheet, TextStyle } from "react-native";
export function FlorenceText({
  children,
  size = "base",
  style
}: {
  children: React.ReactNode;
  size?: string;
  style?: StyleProp<TextStyle>
}) {
  return (
    <DefaultText
      style={[
        styles.text,
        size === "base"
          ? { fontSize: 22, lineHeight: 31.108 }
          : { fontSize: 14, lineHeight: 16.8 },
        style,
      ]}
    >
      {children}
    </DefaultText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "FlorencesansSC",
    fontWeight: "bold",
    lineHeight: 31.108,
    color: "white",
    textAlign: "center",
    alignSelf: "stretch",
  },
});
