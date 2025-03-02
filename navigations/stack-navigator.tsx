import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthProvider } from "../contexts/AuthContext";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import BottomNavigator from "./bottom-navigator";
import Welcome from "../screens/Auth/Welcome";



const StackComponent = createNativeStackNavigator();

const StackNavigator = () => {
  const {hasCompletedOnboarding} = useAuthProvider();

  return (
    <>
      <StatusBar
        backgroundColor={'white'}
        barStyle={"dark-content"}
      />
      <StackComponent.Navigator
        initialRouteName={hasCompletedOnboarding ? "Welcome" : "Onboarding" }
        screenOptions={{
          headerShown: false,
        }}
        >
        <StackComponent.Screen name={"Onboarding"} component={Onboarding} />
        <StackComponent.Screen name={"Welcome"} component={Welcome} />
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
