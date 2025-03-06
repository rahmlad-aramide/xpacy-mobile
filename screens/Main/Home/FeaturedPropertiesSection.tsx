import {
  ActiveSavedSVG,
  BathsSVG,
  BedSVG,
  MapMarkerSVG,
  SavedSVG,
} from "@/assets/svgs";
import { FlorenceText } from "@/components/FlorenceText";
import { COLORS } from "@/constants/Colors";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "@/constants/theme";
import { Naira } from "@/components/Naira";
import { useState } from "react";
import { formatNigerianCurrency } from "@/utils/helper";
import { Empty } from "@/components/Empty";

interface IData {
    id: number;
    image: any;
    type: string;
    isSaved: boolean;
    category: string;
    detail: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
}
export const FeaturedPropertiesSection = () => {
  const [saved, setSaved] = useState(false);

  const data: IData[] = [
    {
        id: 1,
        image: IMAGES.featured,
        type: 'Sale',
        isSaved: false,
        category: 'Terrace',
        detail: 'Luxury 4-Bedroom Terrace Home with BQ',
        location: 'Ikoyi, Lagos',
        price: '1000000000',
        beds: 5,
        baths: 4
    },
    {
        id: 2,
        image: IMAGES.featured,
        type: 'Sale',
        isSaved: false,
        category: 'Terrace',
        detail: 'Luxury 6-Bedroom Terrace Home with BQ',
        location: 'Ikoyi, Lagos',
        price: '1000000000',
        beds: 5,
        baths: 4
    },
    {
        id: 3,
        image: IMAGES.featured,
        type: 'Sale',
        isSaved: false,
        category: 'Terrace',
        detail: 'Luxury 5-Bedroom Terrace Home with BQ',
        location: 'Ikoyi, Lagos',
        price: '1000000000',
        beds: 5,
        baths: 4
    },
];
  const renderItem = ({ item }: {item: IData}) => (
    <View className="flex w-[313px] rounded-lg border border-neutral-100 shadow-featured-card bg-white">
      <ImageBackground
        source={item.image}
        imageStyle={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
        resizeMode="cover"
        className="h-[280px] w-full border border-neutral-200 rounded-t-lg p-4"
      >
        <View className="flex flex-row justify-between items-start">
          {/* TODO: Change the font below to bold */}
          <View className="bg-primary rounded-full px-4 py-2">
            <Text className="font-unitext text-white text-sm leading-4">
              {item.type}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setSaved(!saved)}
            className="w-12 h-12 rounded-full bg-primary-100 flex justify-center items-center"
          >
            {item.isSaved ? <ActiveSavedSVG /> : <SavedSVG stroke={COLORS.primary} />}
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View className="p-4 gap-6">
        <View className="flex gap-2">
          <Text className="font-unitext text-sm text-neutral-900">Terrace</Text>
          <Text
            className="font-florenceSansExp text-lg text-base-black"
            numberOfLines={2}
          >
            {item.detail}
          </Text>
          <View className="flex flex-row items-center gap-1">
            <MapMarkerSVG />
            <Text className="font-unitext text-neutral-900" numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          <View className="flex flex-row">
            <Naira />
            <Text className="font-unitext text-secondary-500 text-2xl">
                {formatNigerianCurrency(item.price)}
            </Text>
          </View>
        </View>
        <View className="w-full h-px bg-neutral-200"></View>
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row gap-1 items-center">
            <BedSVG />
            <Text className="font-unitext text-neutral-900">Beds: {item.beds}</Text>
          </View>
          <View className="flex flex-row gap-1 items-center">
            <BathsSVG />
            <Text className="font-unitext text-neutral-900">Baths: {item.baths}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  const ItemSeparatorComponent = () => (
    <View className="h-full w-6"></View>
  )
  return (
    <View className="flex gap-4 py-4">
      <FlorenceText style={{ color: COLORS.primary, fontSize: 20 }}>
        Featured Properties
      </FlorenceText>
      <FlatList horizontal renderItem={renderItem} data={data} keyExtractor={item=> `${item.id}`}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={Empty}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
