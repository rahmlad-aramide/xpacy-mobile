import { NotificaitionSVG, UserPlaceholderSVG } from "@/assets/svgs";
import Badge from "@/components/Badge";
import { FlorenceText } from "@/components/FlorenceText";
import { COLORS } from "@/constants/Colors";
import { IMAGES } from "@/constants/theme";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { HomeSearchInput } from "../Search/SearchInput";
import { NotificationButton } from "@/components/NotificationButton";

export const HeaderSection = () => {
  return (
    <View className="flex gap-6">
      <View className="flex flex-row justify-between items-center py-2">
        <View
          className="flex flex-row flex-wrap w-full max-w-[60%]"
          style={{ flexWrap: "wrap" }}
        >
          <FlorenceText
            fontWeight="bold"
            style={{ color: COLORS.primary, textAlign: "left" }}
            numberOfLines={2}
          >
            Welcome Abdrahman,
          </FlorenceText>
        </View>
        <View className="flex flex-row gap-1 w-28">
          <NotificationButton />
          <TouchableOpacity>
            <View className="h-12 w-12 rounded-full flex items-center justify-center border border-primary-200 relative">
                <UserPlaceholderSVG />
              <Image
                source={IMAGES.user}
                className="w-10 h-10 rounded-full bg-primary-200 hidden"
                resizeMode="center"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <HomeSearchInput />
      </View>
    </View>
  );
};
