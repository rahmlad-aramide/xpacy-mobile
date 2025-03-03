import { ILocationResponse, ISignUpCredentials, IUserResponse } from '@/types';
import { get, post } from './api';

export const fetchLocations = async (): Promise<ILocationResponse> =>{
    return get(`/location/fetch-states`);
}

export const fetchUserData = async (): Promise<IUserResponse> => {
  return get(`/user/fetch-profile`);
};

export const loginUser = async (credentials: object) => {
  return post('/login', credentials);
};

export const registerUser = async (credentials: ISignUpCredentials) => {
  return post('/login', credentials);
};