import { DropdownComponentDataProps, DropdownComponentProps, ILocationResponse } from "@/types";
import DropdownComponent from "../Input/Dropdown";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Text } from "react-native";
import { fetchLocations } from "@/utils/endpoints";
import { transformLocationsForDropdown } from "@/utils/helper";

const LocationsDropdown: React.FC<Omit<DropdownComponentProps, "data">> = ({
  value,
  setValue,
  errorText
}) => {
  const [data, setData] = useState<DropdownComponentDataProps[]>([{label: '', value: ''}]);
  useEffect(()=> {
    const getLocations = async () => {
      try {
        const locations = await fetchLocations();
        const transformedData = transformLocationsForDropdown(locations)
        setData(transformedData)
      } catch (error) {
        console.error('Error fetching locations:', error);
        Alert.alert('Error fetching locations', 'Unable to fetch locations now, pls try again later!')
      }
    };
    //TODO: Uncomment the function call below
    // getLocations();
  },[])
  return (
    <View className="mb-6">
      <Text className="mb-2 text-base-black text-sm font-unitext">
        Choose your location {<Text className="text-red-500">*</Text>}
      </Text>
      <DropdownComponent value={value} setValue={setValue} data={data} placeholder="Choose a location" errorText={errorText} />
      {errorText && (
        <Text className="mt-1 text-xs font-unitext text-red-500">
          * {errorText}
        </Text>
      )}
    </View>
  );
};
export default LocationsDropdown;
