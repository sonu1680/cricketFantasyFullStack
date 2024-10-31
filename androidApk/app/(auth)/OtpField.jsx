import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
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
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

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
 async function savePhone(key, value) {
   await SecureStore.setItemAsync(key, value);
 }

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    const enteredOtp = otp.join("");
    if (enteredOtp.length != 6) {
      return Toast.show({
        text1: "Enter 6 digit OTP.",
        type: "error",
      });
    }

    try {
      const res = await axiosRequest.post("auth/otpVerification", {
        otp: enteredOtp,
        phone: mobileNumber,
      });
      const token = res.data.message.token;
      save("jwtToken", token);
      savePhone("phone",mobileNumber);

      Toast.show({
        text1: "Login success.",
        type: "success",
      });
      setIsLoading(false);
      router.replace("/(tabs)/Home");
    } catch (error) {
      Toast.show({
        text1: "Wrong OTP or OTP expired. Try again.",
        type: "error",
      });
      setIsLoading(false);
    }
  };

  const handleLoginPage = () => {
    router.back();
  };

  const handleResendOtp = async () => {
    setResendTimer(30);
    setIsLoading(false);
    try {
      const res = await axiosRequest.post("auth/signup", {
        phone: mobileNumber,
      });
    } catch (error) {}

    setIsResendDisabled(true);
    Toast.show({
      text1: "OTP resent.",
      type: "success",
    });
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
            className={` rounded-md py-3 mb-4 ${isLoading ? "" : "bg-red-500"}`}
            onPress={handleVerifyOtp}
          >
            {isLoading ? (
              <View className="w-full  absolute rounded-md flex justify-center items-center ">
                <ActivityIndicator
                  size={"large"}
                  color={"red"}
                ></ActivityIndicator>
              </View>
            ) : (
              <Text className="text-white text-center font-semibold">
                SEND OTP
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-between">
            <TouchableOpacity
              disabled={isResendDisabled}
              onPress={handleResendOtp}
            >
              <Text
                className={`text-red-500 ${
                  isResendDisabled ? "opacity-50" : ""
                }`}
              >
                Resend OTP
              </Text>
            </TouchableOpacity>
            <Text className="text-gray-500">
              00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
            </Text>
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
