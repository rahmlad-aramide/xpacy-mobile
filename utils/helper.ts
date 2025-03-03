import { DropdownComponentDataProps, ILocation, ILocationResponse } from "@/types";

export const transformLocationsForDropdown = (response: ILocationResponse | null): DropdownComponentDataProps[] => {
    if (!response || !response.state) {
      return [];
    }
  
    return response.state.map((data) => ({
      label: data.location,
      value: data.location,
    }));
  };