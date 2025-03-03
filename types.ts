// NavigationTypes.ts
import { ParamListBase } from '@react-navigation/native';
import { Dispatch, SetStateAction } from 'react';

export interface HomeTabParamList extends ParamListBase {
  Home: undefined;
  Search: undefined;
}

export interface RootStackParamList extends ParamListBase {
    Onboarding: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  Profile: { userId: string };
  HomeTabs: undefined;
}

export interface DropdownComponentDataProps {
  label: string;
  value: string;
}
export interface DropdownComponentProps {
    value: string|null;
    setValue: Dispatch<SetStateAction<string|null>>,
    data: Array<DropdownComponentDataProps>,
    showLabel?: boolean,
    placeholder?: string
    errorText?: string|null
}
export interface ILocation {
  id: number;
  location: string;
}

export interface ILocationResponse {
  state: ILocation[];
}

export interface ISignUpCredentials {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  state: string;
}

export interface IUserData {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string | null;
  address: string | null;
  referralCode: string;
  refferalPoints: number;
  state: string;
  display_picture: string | null;
  created_at: string;
}

export interface IUserResponse {
  success: boolean;
  user: IUserData;
  expired?: boolean;
  error?: string;
}