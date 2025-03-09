import { BackArrowSVG } from "@/assets/svgs";
import Button from "@/components/Button/Button";
import LabeledInput from "@/components/Input/LabeledInput";
import { UnitextBold } from "@/components/Unitext";
import { FONTS, IMAGES } from "@/constants/theme";
import { RootStackParamList } from "@/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

interface ForgotPasswordProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
}

function ForgotPassword({navigation}: ForgotPasswordProps) {
  const [email, setEmail] = useState('');

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
          <View className="flex flex-col gap-14 pt-24 px-6">
            <View className="flex justify-center items-center">
              <Image source={IMAGES.logo2} className="max-h-8" resizeMode="center" />
            </View>
            <View className="gap-12">
              <View className="flex gap-2 justify-center items-center">  
                <Text style={{...FONTS.h2}} className="text-primary text-center">Forgot Password?</Text>
                <Text className="text-center font-unitext text-base-black">Enter your email address below, and we'll send you a link to reset your password.</Text>
              </View>
              <View>
                <LabeledInput label={"Email address"} placeholder={'Enter your email address'} value={email} onChangeText={setEmail} keyboardType="email-address" />
              </View>
              <View className="flex gap-6">
                <Button title="Send Reset Link" onPress={()=>{console.log('send link pqressed')}} />
                  <TouchableOpacity onPress={()=>navigation.goBack()} className="h-6 items-center flex-row">
                    <BackArrowSVG /> 
                    <Text className="font-unitext text-primary">
                      Back to <UnitextBold>Login</UnitextBold> 
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ForgotPassword;
