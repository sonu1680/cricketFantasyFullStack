import React, { useState } from "react";
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
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { axiosRequest } from "../utils/axiosRequest";
const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSendOtp = async () => {
    if (!isChecked) {
      return Toast.show({
        text1: "Please Accept T&C. ",
        type: "error",
      });
    }
    if (mobileNumber.length != 10) {
      return Toast.show({
        text1: "Enter mobile number correctly.",
        type: "error",
      });
    }

    setIsLoading(true);
    try {
      
      const res = await axiosRequest.post("auth/signup", {
        phone: mobileNumber,
      });
     
      if (res.status == 200) {
        setIsLoading(false);

        router.push({
          pathname: "OtpField",
          params: { mobileNumber: mobileNumber },
        });
      }
    } catch (error) {
      setIsLoading(false);
      return Toast.show({
        text1: "Something wrong. please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
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
            Welcome to Fantasy11
          </Text>
        </View>

        <View className="bg-white rounded-lg p-4  gap-y-4">
          <View className="flex-row mb-4">
            <TouchableOpacity className="flex-1 py-2 border-b-2 border-red-500">
              <Text className="text-center text-red-500 font-semibold">
                Mobile
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Mobile</Text>
            <View className="flex-row items-center border border-gray-300 rounded-md">
              <Text className="px-2 text-gray-600">+91</Text>
              <TextInput
                className="flex-1 py-2 px-2"
                placeholder="Enter Mobile Number"
                keyboardType="phone-pad"
                value={mobileNumber}
                maxLength={10}
                onChangeText={setMobileNumber}
              />
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              className="w-5 h-5 border border-gray-300 rounded mr-2"
              onPress={() => setIsChecked(!isChecked)}
            >
              {isChecked && (
                <View className="flex-1 bg-red-500 m-0.5 rounded-sm" />
              )}
            </TouchableOpacity>
            <Text className="text-sm text-gray-600">
              I certify that I am above 18 years, I agree to{" "}
              <Text className="text-red-500">T&Cs</Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleSendOtp()}
            className={` rounded-md py-3 mb-4 ${isLoading ? "" : "bg-red-500"}`}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
