// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import { IUserData, LoginNavigationProp, RootStackParamList } from '@/types';
import { fetchUserData } from '@/utils/endpoints';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type LoginFunction = (token: string, username: string, password: string, rememberMe: boolean) => Promise<void>;
interface AuthContextType {
    isSignedIn: boolean;
    isLoading: boolean;
    handleLogin: LoginFunction;
    handleLogout: () => Promise<void>;
    hasCompletedOnboarding: boolean;
    handleOnboardingComplete: () => Promise<void>;
    userData: IUserData | null;
  }
  
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [expirationTime, setExpirationTime] = useState<number | null>(null);
  const navigation = useNavigation<LoginNavigationProp>();

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
        try {
          const tokenData = await AsyncStorage.getItem('tokenData');
          const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
          setHasCompletedOnboarding(onboardingStatus === 'true');
      
          if (tokenData) { 
            try {
              const response = await fetchUserData()
              console.log('fetchUser Res', response)      
              const data = response; 
      
              if (data.success === false || data.expired === true || data.error === 'Invalid token.') {
                await AsyncStorage.removeItem('tokenData');
                setIsSignedIn(false);
                setExpirationTime(null);
              } else {
                setIsSignedIn(true);
                setUserData(data.user);
                setExpirationTime(Date.now() + 3600000);
              }
            } catch (axiosError: any) { 
              if (axiosError.response && axiosError.response.data) {
                const data = axiosError.response.data;
                if (data.success === false || data.expired === true || data.error === 'Invalid token.') {
                  await AsyncStorage.removeItem('tokenData');
                  setIsSignedIn(false);
                  setExpirationTime(null);
                } else {
                  setIsSignedIn(false);
                }
              } else {
                 setIsSignedIn(false);
              }
            }
          } else {
            setIsSignedIn(false);
            setExpirationTime(null);
          }
        } catch (error) {
          console.error('Error checking auth:', error);
          setIsSignedIn(false);
          setExpirationTime(null);
        } finally {
          setIsLoading(false);
        }
      };

      const handleAppStateChange = (state: AppStateStatus) => {
        if (state === 'active') {
          checkAuthAndOnboarding();
        }
      };
    
      const subscription = AppState.addEventListener('change', handleAppStateChange);
    
      // Run the check on initial mount
      checkAuthAndOnboarding();
    
      // Clean up the event listener
      return () => {
        subscription.remove();
      };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
        if (expirationTime && Date.now() > expirationTime) {
            // Token has expired
            setIsSignedIn(false);
            setUserData(null);
            AsyncStorage.removeItem('tokenData');
            setExpirationTime(null);
            Alert.alert("Session Timed Out.", "Your session has expired. Please log in again.");
            //TODO: look into the ignored error below.
            navigation.navigate('Login')
        }
    }, 60000);

    return () => clearInterval(timer);
}, [expirationTime]);

  const handleLogin: LoginFunction = async (token, username, password, rememberMe) => {
    try {
      await AsyncStorage.setItem('tokenData', JSON.stringify({ token }));
      if (rememberMe) {
        await AsyncStorage.setItem('rememberedUsername', username);
        await AsyncStorage.setItem('rememberedPassword', password);
      } else {
        await AsyncStorage.removeItem('rememberedUsername');
        await AsyncStorage.removeItem('rememberedPassword');
      }
      setIsSignedIn(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('tokenData');
      setIsSignedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Onboarding error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        isLoading,
        handleLogin,
        handleLogout,
        hasCompletedOnboarding,
        handleOnboardingComplete,
        userData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = (): AuthContextType => {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuthProvider must be used within an AuthProvider');
    }
  
    return context;
  };