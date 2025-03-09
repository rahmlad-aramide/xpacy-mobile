// NavigationTypes.ts
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dispatch, SetStateAction } from 'react';

export type TPlatform = 'gmail'|'facebook'|'instagram'|'tiktok'|'x';
export type TActiveNotificationSheet = 'sort'|'filter';
export interface HomeTabParamList extends ParamListBase {
  Home: undefined;
  Search: {id: string};
}
export type ReferralNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Referral'
>;
export type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type SearchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;
export type NotificationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

export interface RootStackParamList extends ParamListBase {
  Onboarding: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  Profile: { userId: string };
  HomeTabs: undefined;
  Refferral: undefined;
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

export interface ICardData {
  id: number;
  image: any;
  category: string;
  detail: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
}

export interface IReferredUser {
  id?: number;
  name: string;
  email: string;
  dateJoined: string;
}

export interface INotification {
  id: string;
  title: string;
  body: string;
  date: string;
}

export interface INotificationItemProps {
  item: INotification;
  deletingId: string | null;
  setDeleting: (id: string | null) => void;
}