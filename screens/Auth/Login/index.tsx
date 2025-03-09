import Button from "@/components/Button/Button";
import LabeledInput from "@/components/Input/LabeledInput";
import RadioButton from "@/components/Input/RadioButton";
import { UnitextBold } from "@/components/Unitext";
import { FONTS, IMAGES } from "@/constants/theme";
import { RootStackParamList } from "@/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

function Login({navigation}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [accountType, setAccountType] = useState('User');
  // Error states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleCheckBoxToggle = () => {
    setRememberMe(!rememberMe)
  }

  const handleLogin = () => {
    // Reset errors
    setEmailError(null);
    setPasswordError(null);

    let isValid = true;

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (isValid) {
      console.log('Login successful');
      // Perform login logic here (API call, etc.)
      navigation.navigate("BottomNavigator");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar backgroundColor="#FCFEFF" style="dark" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <View style={{gap: 48}} className="flex flex-col pt-24 px-6">
            <View className="flex justify-center items-center">
              <Image source={IMAGES.logo2} className="max-h-8" resizeMode="center" />
            </View>
            <View className="flex gap-2 justify-center items-center pt-6">  
              <Text style={{...FONTS.h2}} className="text-primary text-center">Welcome Back!</Text>
              <Text className="text-center font-unitext text-base-black">Enter your email address and password to log in.</Text>
            </View>
            <View className="flex gap-8">
              <View>
                <LabeledInput label={"Email address"} placeholder={'Enter your email address'} value={email} onChangeText={setEmail} keyboardType="email-address" errorText={emailError} />
                <LabeledInput label={"Password"} placeholder={'Enter your password'} value={password} onChangeText={setPassword} type="password" errorText={passwordError} />
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row gap-2">
                    <Checkbox value={rememberMe} onValueChange={handleCheckBoxToggle} color={'#203645'} />
                    <Text className="text-base-black font-unitext" onPress={()=>handleCheckBoxToggle()}>Remember Me</Text>
                  </View>
                  <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}>
                    <Text className="font-unitext text-primary">
                      Forgot Password?
                    </Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text className="mb-2 text-base-black text-sm font-unitext">
                  Account type
                </Text>
                <RadioButton selectedOption={accountType} setSelectedOption={setAccountType} options={['User', 'Property Owner']} />
              </View>
            </View>
            <View className="flex gap-6">
              <Button title="Log In" onPress={()=>{navigation.navigate('BottomNavigator')}}/>
              <TouchableOpacity onPress={()=>navigation.replace('SignUp')}><Text className="font-unitext text-base-black">Don't have an account? <UnitextBold className="text-primary underline">Sign Up</UnitextBold></Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
