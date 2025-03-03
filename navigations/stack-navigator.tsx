import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthProvider } from "../contexts/AuthContext";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Auth/Login";
import BottomNavigator from "./bottom-navigator";
import ForgotPassword from "@/screens/Auth/ForgotPassword";
import { RootStackParamList } from "@/types";
import SignUp from "@/screens/Auth/SignUp";



const StackComponent = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const {hasCompletedOnboarding} = useAuthProvider();

  return (
    <>
      <StatusBar
        backgroundColor={'white'}
        barStyle={"dark-content"}
      />
      <StackComponent.Navigator
        initialRouteName={hasCompletedOnboarding ? "Login" : "Onboarding" }
        screenOptions={{
          headerShown: false,
        }}
        >
        <StackComponent.Screen name={"Onboarding"} component={Onboarding} />
        <StackComponent.Screen name={"ForgotPassword"} component={ForgotPassword} />
        <StackComponent.Screen name={"Login"} component={Login} />
        <StackComponent.Screen name={"SignUp"} component={SignUp} />
        <StackComponent.Screen
          name={"BottomNavigator"}
          component={BottomNavigator}
        />       
      </StackComponent.Navigator>
    </>
  );
};
export default StackNavigator;
