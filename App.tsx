import 'expo-dev-client';
import "react-native-reanimated";
import './global.css'
import * as ExpoSplashScreen from 'expo-splash-screen'
import { SplashScreen } from "./components/SplashScreen";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import StackNavigator from './navigations/stack-navigator';
import { AuthProvider } from './contexts/AuthContext';

export default function RootLayout() {
  ExpoSplashScreen.preventAutoHideAsync();
  
  const [loaded, error] = useFonts({
    'Unitext-Regular': require("./assets/fonts/Unitext-Regular.ttf"),
    'FlorencesansSC': require("./assets/fonts/FlorencesansSC.ttf"),
    'FlorencesansSC-Exp': require("./assets/fonts/FlorencesansSC-Exp.ttf"),
    'FlorencesansSC-Bold': require("./assets/fonts/FlorencesansSC-Bold.ttf"),
    'FlorencesansSC-Exp-Bold': require("./assets/fonts/FlorencesansSC-Exp-Bold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [loaded]);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
