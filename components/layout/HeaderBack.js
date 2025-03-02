import { Image, Text, View } from "react-native";
import { COLORS, FONTS, IMAGES } from "../constants/theme";
import { useNavigation, useTheme } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HeaderBack = ({ title}) => {
    const navigation = useNavigation();
    const theme = useTheme();
    const { colors } = theme;
    const isDark = theme["dark"];
    return (
      <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 40,
      }}
    >
      <View>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={(props) => (
            <MaterialIcons name="arrow-back-ios" {...props} />
          )}
          iconColor={colors.title}
          size={20}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 50,
        }}
      >
        <Text
          style={{
            ...FONTS.fontMedium,
            fontSize: 24,
            color: colors.title,
            lineHeight: 35,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
    )
}

export default HeaderBack;