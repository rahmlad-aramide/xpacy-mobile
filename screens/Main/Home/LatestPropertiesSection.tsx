import { SmallBathsSVG, SmallBedSVG, SmallMapMarkerSVG } from "@/assets/svgs";
import { FlorenceText } from "@/components/FlorenceText";
import { COLORS } from "@/constants/Colors";
import { ImageBackground, Text, View } from "react-native";
import { IMAGES } from "@/constants/theme";
import { Naira } from "@/components/Naira";
import { Image } from "react-native";

export const LatestPropertiesSection = () => {
  return (
    <View className="flex gap-4 pt-4">
      <FlorenceText style={{ color: COLORS.primary, fontSize: 20 }}>
        Latest Properties
      </FlorenceText>
      {/* Latest Card */}
      <View className="flex flex-row w-full max-w-[298px] rounded-lg border border-neutral-100 shadow-featured-card bg-white">
        <Image
          source={IMAGES.latest}
          resizeMode="cover"
          className="h-full w-1/2 border border-neutral-200 rounded-l-lg p-4"
        />
        <View className="flex flex-row w-1/2 p-4 gap-6">
          <View className="flex flex-nowrap gap-2">
            <View className="gap-1">
              <Text className="font-unitext text-sm text-neutral-900">
                Duplex
              </Text>
              <Text
                className="font-florenceSansExp text-sm text-base-black"
                numberOfLines={3}
              >
                4-Bedroom Semi-detached Duplex with BQ
              </Text>
            </View>
            <View className="flex flex-row items-center gap-0.5">
              <SmallMapMarkerSVG />{" "}
              <Text
                className="font-unitext text-neutral-900 text-xs"
                numberOfLines={1}
              >
                Ikoyi, Lagos
              </Text>
            </View>
            <View className="flex flex-row">
              <Naira size="sm" />
              <Text
                className="font-unitext text-secondary-500 text-sm"
                numberOfLines={3}
              >
                1,000,000,000
              </Text>
            </View>
            <View className="w-full h-px bg-neutral-200"></View>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-1 items-center">
                <SmallBedSVG />
                <Text className="font-unitext text-neutral-900 text-xs">
                  Bed: 4
                </Text>
              </View>
              <View className="flex flex-row gap-1 items-center">
                <SmallBathsSVG />
                <Text className="font-unitext text-neutral-900 text-xs">
                  Baths: 4
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
