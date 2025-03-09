import { AdvancedFilterSVG, ClockIconSVG, CloseIconSVG, SearchSVG } from "@/assets/svgs";
import Button from "@/components/Button/Button";
import { FlorenceText } from "@/components/FlorenceText";
import DropdownComponent from "@/components/Input/Dropdown";
import { Header } from "@/components/layout/Header";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Search({ navigaton, route }: any) {
  const autoFocus = route.params?.autoFocus;
  const {width} = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [420], []);
  const [purpose, setPurpose] = useState<string|null>('');
  const [location, setLocation] = useState<string|null>('');
  const [type, setType] = useState<string|null>('');
  const [bedroom, setBedroom] = useState<string|null>('');
  const [minPrice, setMinPrice] = useState<string|null>('');
  const [maxPrice, setMaxPrice] = useState<string|null>('');

  // console.log("autoFocus", autoFocus);

  const clearFilters = () => {
    setPurpose(null);
    setLocation(null);
    setType(null);
    setBedroom(null);
    setMinPrice(null);
    setMaxPrice(null);
  };
  

  return (
    <GestureHandlerRootView>
      <View className="flex-1 px-6 pt-2 bg-background">
        <Header title="Search" />
        <View className="pt-6 gap-4">
          <View className="flex-row rounded-lg bg-neutral-100 border border-primary h-10">
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
                autoFocus={autoFocus}
              />
            </View>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.expand()}
              style={{
                width: 50,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}
              className="bg-primary justify-center items-center"
            >
              <AdvancedFilterSVG />
            </TouchableOpacity>
          </View>
          <View className="gap-4">
            <View className="flex-row justify-between">
              <Text className="font-unitext text-base-black">Recent Search</Text>
              <TouchableOpacity><Text className="font-unitext text-error">Clear All</Text></TouchableOpacity>
            </View>
            <View className="flex-row justify-between h-6 items-center">
              <View className="flex-row gap-2 items-center"><ClockIconSVG /><Text numberOfLines={1} className="font-unitext text-sm text-neutral-900">4 bedroom apartment in Lagos</Text></View>
              <TouchableOpacity><CloseIconSVG /></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <BottomSheet
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        index={-1}
        handleIndicatorStyle={{width: 60, backgroundColor: '#A2A2A2', height: 3, marginTop: 6}}
        backgroundStyle={{
          backgroundColor: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderWidth: 1,
          borderColor: "#E0E0E0",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 8,
          width,
        }}
      >
        <BottomSheetView>
          <View className="p-6 gap-4">
            <FlorenceText>Filter Options</FlorenceText>
            <View className="gap-6">
              <View className="flex gap-4">
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <DropdownComponent value={purpose} setValue={setPurpose} data={[{label: 'Purpose', value: 'Purpose'}]} placeholder="Select Purpose" />
                  </View>
                  <View className="flex-1">
                    <DropdownComponent value={location} setValue={setLocation} data={[{label: 'Location', value: 'Location'}]} placeholder="Select Location" />
                  </View>
                </View>
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <DropdownComponent value={type} setValue={setType} data={[{label: 'Type', value: 'Type'}]} placeholder="Select Type" />
                  </View>
                  <View className="flex-1">
                    <DropdownComponent value={bedroom} setValue={setBedroom} data={[{label: 'Bedroom', value: 'Bedroom'}]} placeholder="Select Bedroom" />
                  </View>
                </View>
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <DropdownComponent value={minPrice} setValue={setMinPrice} data={[{label: 'Min Price', value: 'Min Price'}]} placeholder="Select Min Price" />
                  </View>
                  <View className="flex-1">
                    <DropdownComponent value={maxPrice} setValue={setMaxPrice} data={[{label: 'Max Price', value: 'Max Price'}]} placeholder="Select Max Price" />
                  </View>
                </View>
              </View>
              <View className="gap-4">
                <Button title="Apply Filter" onPress={()=>{}} />
                <Button outline title="Clear Filter" onPress={clearFilters} />
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default Search;
