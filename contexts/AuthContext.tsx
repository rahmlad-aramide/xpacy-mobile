// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
import { AppState, AppStateStatus } from 'react-native';

type LoginFunction = (token: string, username: string, password: string, rememberMe: boolean) => Promise<void>;
interface AuthContextType {
    isSignedIn: boolean;
    isLoading: boolean;
    handleLogin: LoginFunction;
    handleLogout: () => Promise<void>;
    hasCompletedOnboarding: boolean;
    handleOnboardingComplete: () => Promise<void>;
  }
  
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
        try {
          const tokenData = await AsyncStorage.getItem('tokenData');
          const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
          setHasCompletedOnboarding(onboardingStatus === 'true');
      
          if (tokenData) {
            const { token } = JSON.parse(tokenData);
      
            try {
              // const response = await axios.get('YOUR_API_ENDPOINT', { 
              //   headers: {
              //     Authorization: `Bearer ${token}`,
              //   },
              // });
      
              // const data = response.data; 
              // TODO Fix the axios issue
              let data: any = {}; 
      
              if (data.success === false && data.expired === true) {
                await AsyncStorage.removeItem('tokenData');
                setIsSignedIn(false);
              } else {
                setIsSignedIn(true);
              }
            } catch (axiosError: any) { 
              if (axiosError.response && axiosError.response.data) {
                const data = axiosError.response.data;
                if (data.success === false && data.expired === true) {
                  await AsyncStorage.removeItem('tokenData');
                  setIsSignedIn(false);
                } else {
                  setIsSignedIn(false);
                }
              } else {
                 setIsSignedIn(false);
              }
            }
          } else {
            setIsSignedIn(false);
          }
        } catch (error) {
          console.error('Error checking auth:', error);
          setIsSignedIn(false);
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