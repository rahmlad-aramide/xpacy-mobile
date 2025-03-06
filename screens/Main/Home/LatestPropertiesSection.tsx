import { SmallBathsSVG, SmallBedSVG, SmallMapMarkerSVG } from "@/assets/svgs";
import { FlorenceText } from "@/components/FlorenceText";
import { COLORS } from "@/constants/Colors";
import { Text, View } from "react-native";
import { IMAGES } from "@/constants/theme";
import { Naira } from "@/components/Naira";
import { Image } from "react-native";
import { ICardData } from "@/types";
import { FlatList } from "react-native";
import { Empty } from "@/components/Empty";

export const LatestPropertiesSection = () => {

    const data: ICardData[] = [
        {
          id: 1,
          image: IMAGES.latest,
          category: 'Duplex',
          detail: '4-Bedroom Semi-detached Duplex with BQ',
          location: 'Ikoyi, Lagos',
          price: '1,000,000,000',
          beds: 4,
          baths: 4,
        },
        {
          id: 2,
          image: IMAGES.latest,
          category: 'Mansion',
          detail: '8-Bedroom detached Mansion with pool',
          location: 'VI, Lagos',
          price: '5,000,000,000',
          beds: 8,
          baths: 6,
        },
        {
          id: 3,
          image: IMAGES.latest,
          category: 'Apartment',
          detail: '2-Bedroom Apartment with view',
          location: 'Lekki, Lagos',
          price: '500,000,000',
          beds: 2,
          baths: 2,
        }
      ];

      const renderItem = ({ item }: { item: ICardData }) => (
        <View className="flex flex-row w-[298px] rounded-lg border border-neutral-100 shadow-featured-card bg-white">
          <Image
            source={item.image}
            resizeMode="cover"
            className="h-full w-1/2 border border-neutral-200 rounded-l-lg p-4"
          />
          <View className="flex flex-row w-1/2 p-4 gap-6">
            <View className="flex flex-nowrap gap-2">
              <View className="gap-1">
                <Text className="font-unitext text-sm text-neutral-900">
                  {item.category}
                </Text>
                <Text
                  className="font-florenceSansExp text-sm text-base-black"
                  numberOfLines={3}
                >
                  {item.detail}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-0.5">
                <SmallMapMarkerSVG />
                <Text
                  className="font-unitext text-neutral-900 text-xs"
                  numberOfLines={1}
                >
                  {item.location}
                </Text>
              </View>
              <View className="flex flex-row">
                <Naira size="sm" />
                <Text className="font-unitext text-secondary-500 text-sm">
                  {item.price}
                </Text>
              </View>
              <View className="w-full h-px bg-neutral-200" />
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-1 items-center">
                  <SmallBedSVG />
                  <Text className="font-unitext text-neutral-900 text-xs">
                    Bed: {item.beds}
                  </Text>
                </View>
                <View className="flex flex-row gap-1 items-center">
                  <SmallBathsSVG />
                  <Text className="font-unitext text-neutral-900 text-xs">
                    Baths: {item.baths}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    
      const keyExtractor = (item: ICardData) => item.id.toString();
      const ItemSeparatorComponent = () => (
        <View className="h-full w-6"></View>
      )

  return (
    <View className="flex gap-4 pt-4">
      <FlorenceText style={{ color: COLORS.primary, fontSize: 20 }}>
        Latest Properties
      </FlorenceText>
      {/* Latest Card */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={Empty}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
