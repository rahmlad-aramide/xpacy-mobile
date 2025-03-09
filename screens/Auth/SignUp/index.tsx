import Button from "@/components/Button/Button";
import LabeledInput from "@/components/Input/LabeledInput";
import LocationsDropdown from "@/components/LocationsDropdown";
import { UnitextBold } from "@/components/Unitext";
import { FONTS, IMAGES } from "@/constants/theme";
import { ISignUpCredentials, RootStackParamList } from "@/types";
import { registerUser } from "@/utils/endpoints";
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
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}

function SignUp({ navigation }: LoginProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState<string|null>(null);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  // Error states
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [privacyPolicyError, setPrivacyPolicyError] = useState<string | null>(null);

  const handleCheckBoxToggle = () => {
    setPrivacyPolicy(!privacyPolicy);
  };

  const handleSignUp = async () => {
    // Reset errors
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setLocationError(null);
    setPrivacyPolicyError(null);

    let isValid = true;

    if (!firstName) {
      setFirstNameError('First name is required.');
      isValid = false;
    }

    if (!lastName) {
      setLastNameError('Last name is required.');
      isValid = false;
    }

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
    } else if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      setPasswordError('Password must be at least 8 characters with uppercase, lowercase, and a number.');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (!location) {
      setLocationError('Location is required.');
      isValid = false;
    }

    if (!privacyPolicy) {
      setPrivacyPolicyError('* To continue, pls read and agree to our terms and condition and privacy policy.');
      isValid = false;
    }

    if (isValid) {
      const credentials: ISignUpCredentials = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        state: `${location}`,
      }
      console.log('credentials',credentials);
      try {
        const response = await registerUser(credentials);
        console.log('Registration successful: ', response);
      } catch (error) {
        console.log("Error signing up", error)
      }
      navigation.navigate('Login');
      //TODO: Implement the Signup logic here (API call, etc.)
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
          <View style={{ gap: 48 }} className="flex flex-col pt-24 pb-12 px-6">
            <View className="flex justify-center items-center">
              <Image
                source={IMAGES.logo2}
                className="max-h-8"
                resizeMode="center"
              />
            </View>
            <View className="flex gap-2 justify-center items-center">
              <Text
                style={{ ...FONTS.h2 }}
                className="text-primary text-center"
              >
                Sign Up
              </Text>
              <Text className="text-center font-unitext text-base-black">
                Enter your details below to sign up.
              </Text>
            </View>
            <View className="flex gap-8">
              <View>
                <LabeledInput
                  label={"First name"}
                  placeholder={"Enter your first name"}
                  value={firstName}
                  onChangeText={setFirstName}
                  errorText={firstNameError}
                />
                <LabeledInput
                  label={"Last name"}
                  placeholder={"Enter your last name"}
                  value={lastName}
                  onChangeText={setLastName}
                  errorText={lastNameError}
                />
                <LabeledInput
                  label={"Email address"}
                  placeholder={"Enter your email address"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType={'email-address'}
                  errorText={emailError}
                />
                <LabeledInput
                  label={"Password"}
                  placeholder={"Enter your password"}
                  value={password}
                  onChangeText={setPassword}
                  type="password"
                  errorText={passwordError}
                />
                <LabeledInput
                  label={"Confirm Password"}
                  placeholder={"Confirm your password"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  type="password"
                  errorText={confirmPasswordError}
                />
                <LocationsDropdown value={location} setValue={setLocation} errorText={locationError} />
                <LabeledInput
                  label={"Referral Code"}
                  placeholder={"Enter your referral code"}
                  value={referralCode}
                  onChangeText={setReferralCode}
                  required={false}
                />
                <View className="flex flex-row items-center gap-2">
                  <Checkbox
                    value={privacyPolicy}
                    onValueChange={handleCheckBoxToggle}
                    color={"#203645"}
                  />
                  <Text
                    className="text-base-black font-unitext text-sm"
                    onPress={handleCheckBoxToggle}
                  >
                    I agree to Xpacy's Terms & Conditions and Privacy Policy.
                  </Text>
                </View>
                {privacyPolicyError && (
                  <Text className="mt-1 text-xs font-unitext text-red-500">
                    {privacyPolicyError}
                  </Text>
                )}
              </View>
            </View>
            <View className="flex gap-6">
              <Button
                title="Sign Up"
                onPress={handleSignUp}
              />
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text className="font-unitext text-base-black">
                  Already have an account?{" "}
                  <UnitextBold className="text-primary underline">Log In</UnitextBold>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUp;
