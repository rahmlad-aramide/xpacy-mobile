import { AdvancedFilterSVG, SearchSVG } from "@/assets/svgs";
import { IMAGES } from "@/constants/theme";
import { SearchNavigationProp } from "@/types";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchContent = ({ type, autoFocus=false }: { type: "default" | "home", autoFocus?: boolean }) => {
  return (
    <>
      <View
        style={{
          marginLeft: 8,
          marginRight: 2,
          opacity: 0.6,
          transform: [{ scale: 0.8 }],
        }}
        className="items-center justify-center w-6"
      >
        <SearchSVG />
      </View>
      <View className="flex-1">
        <TextInput
          className="flex-1 font-unitext text-base"
          placeholder="Search for properties"
          editable={type === 'default'}
          autoFocus={autoFocus}
        />
      </View>
      {type === 'home' ?
      <View className="h-10 justify-center">
          <Image source={IMAGES.dictation} style={{marginRight: 8, marginTop: -2}} resizeMode="center" />
      </View>
      :
      <TouchableOpacity
        style={{
          width: 50,
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
        }}
        className="bg-primary justify-center items-center"
      >
        <AdvancedFilterSVG />
      </TouchableOpacity>
      }
    </>
  );
};

export const SearchInput = () => {
  return (
    <View className="flex-row rounded-lg bg-neutral-100 border border-primary h-10">
      <SearchContent type="default" />
    </View>
  );
};

export const HomeSearchInput = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  return (
      <TouchableOpacity
      onPress={() => navigation.navigate("Search", { autoFocus: true })}
      className="flex-row rounded-lg bg-neutral-100 border border-primary-200 h-10"
    >
      <SearchContent type="home" autoFocus={true} />
    </TouchableOpacity>
  );
};
