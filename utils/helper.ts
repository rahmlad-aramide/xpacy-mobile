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

  export function formatNigerianCurrency(
    amount: number | string
  ): string {
    try {
      const num = typeof amount === 'string' ? parseInt(amount, 10) : amount;
  
      if (isNaN(num)) {
        throw new Error('Invalid number provided.');
      }
  
      const formatter = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      });
  
      const formatted = formatter.format(num);
  
      const parts = formatter.formatToParts(num);
  
      const symbolPart = parts.find((part) => part.type === 'currency');
      const valuePart = parts
        .filter((part) => part.type !== 'currency')
        .map((part) => part.value)
        .join('');
  
        // symbol: symbolPart ? symbolPart.value : '₦', // Fallback to ₦ if symbol part is not found
      return valuePart
    } catch (error) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return 'An unexpected error occurred.';
    }
  }
  