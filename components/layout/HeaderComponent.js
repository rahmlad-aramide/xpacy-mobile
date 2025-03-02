import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, IMAGES } from "../constants/theme";
import { useNavigation, useTheme } from "@react-navigation/native";


const HeaderComponent = ({ title}) => {
    // const {title} = props;
    const navigation = useNavigation();
    const theme = useTheme();
    const isDark = theme["dark"];
    return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{
                padding: 10,
                borderRadius: 15,
                height: 50,
                width: 50,
                background: "white",
              }}
            >
              <Image
                style={{ height: 24, width: 24 }}
                tintColor={isDark ? "white": "black"}
                source={IMAGES.hamburger}
              />
            </TouchableOpacity>
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
                  ...FONTS.fontSemiBold,
                  fontSize: 24,
                  color: COLORS.primary,
                }}
              >
                {title}
              </Text>
            </View>
          </View>
    )
}

export default HeaderComponent;