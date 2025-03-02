import LabeledInput from "@/components/Input/LabeledInput";
import { FONTS, IMAGES } from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <View className="flex flex-col gap-8 pt-24 px-6">
            <View className="flex justify-center items-center">
              <Image source={IMAGES.logo2} className="max-h-8" resizeMode="center" />
            </View>
            <View className="flex gap-2 justify-center items-center">  
              <Text style={{...FONTS.h2}} className="text-primary text-center">Welcome Back!</Text>
              <Text className="text-center font-unitext text-base-black">Enter your email address and password to log in.</Text>
            </View>
            <View>
              <LabeledInput label={"Email address"} placeholder={'Enter your email address'} value={email} onChangeText={setEmail} />
              <LabeledInput label={"Password"} placeholder={'Enter your password'} value={password} onChangeText={setPassword} type="password" />
              <View>
                <Text>Login</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Login;
