import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { axiosRequest } from "../utils/axiosRequest";
import * as SecureStore from "expo-secure-store";

const OtpField = () => {
  const router = useRouter();
  const { mobileNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length != 6) {
      return Toast.show({
        text1: "Enter 6 digit otp.",
        type: "error",
      });
    }
    ///axios request

    try {
      const res = await axiosRequest.post("auth/otpVerification", {
        otp: enteredOtp,
        phone: mobileNumber,
      });
      const token = res.data.message.token;
save("jwtToken",token)
      
      Toast.show({
        text1: "Login success.",
        type: "success",
      });
      router.replace("/(tabs)/Home");
    } catch (error) {
      Toast.show({
        text1: "Wrong otp or otp Expired. Try again",
        type: "error",
      });
    }
  };
  const handleLoginPage = () => {
    router.back();
  };
  return (
    <SafeAreaView className="flex-1 bg-red-900">
      <StatusBar style="light" />
      <View className="flex-1 px-4 py-8">
        <View className="items-center mb-8">
          <Image
            source={require("../../assets/loginLogo.png")}
            className="w-28 h-28"
          />
          <Text className="text-white text-2xl font-bold mt-4">
            OTP Verification
          </Text>
        </View>

        <View className="bg-white rounded-lg p-4">
          <Text className="text-center text-gray-600 mb-4">
            Enter the OTP sent to {mobileNumber}
          </Text>

          <View className="flex-row justify-between mb-6">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl"
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            className="bg-red-500 rounded-md py-3 mb-4"
            onPress={handleVerifyOtp}
          >
            <Text className="text-white text-center font-semibold">
              VERIFY OTP
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-between">
            <TouchableOpacity>
              <Text className="text-red-500">Resend OTP</Text>
            </TouchableOpacity>
            <Text className="text-gray-500">00:30</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => handleLoginPage()} className="mt-4">
          <Text className="text-center text-white">Change Phone Number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpField;
