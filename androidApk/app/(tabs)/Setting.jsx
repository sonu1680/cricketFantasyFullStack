// app/settings.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import {
  User,
  Shield,
  CreditCard,
  MapPin,
  HelpCircle,
  LogOut,
  ChevronRight,
  Swords,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsHeader from "../../components/TabsHeader";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { axiosRequest } from "../utils/axiosRequest";

const Setting = () => {
  const router=useRouter();
  const [userProfile,setUserProfile]=useState(null);
  
const handleSignOut=async()=>{
 await SecureStore.deleteItemAsync("jwtToken");
 Toast.show({
  text1:"Logout successfully",
  type:"success"
 });
 router.replace("/(auth)/Login")
}

 const getUserData = async () => {
   try {
     const res = await axiosRequest.get("/user/getUserProfile");
     if (res.status === 200) {
       const data = res.data.message.userProfile;
       setUserProfile(data);
      
     }
   } catch (error) {
     //console.error(error);
    
   }
 };
 useEffect(() => {
   getUserData();
 }, []);


const handleGoToProfile=()=>{
  router.push({
    pathname: "/settingPages/UserProfile",
    params: { data: JSON.stringify(userProfile) },
  });
}
  return (
    <SafeAreaView className=" bg-white">
      <TabsHeader />
      <ScrollView className="p-4">
        {userProfile != null ? (
          <View className="items-center mb-6">
              <Image
                source={{ uri: userProfile.profileImage }}
                className="w-32 h-32 rounded-full"
              />
            <Text className="text-lg font-bold mt-2">
              {userProfile.firstName.toUpperCase()}
            </Text>
            <Text className="text-sm text-gray-500">
              {userProfile.emailId.toLowerCase()}
            </Text>
          </View>
        ) : (
          <View className="items-center mb-6">
              <Image
                source={require("../../assets/playerImg.png")}
                className="w-32 h-32 rounded-full"
              />
            
            <Text className="text-lg font-bold mt-2">
              My Name
            </Text>
            <Text className="text-sm text-gray-500">
             My EmailId
            </Text>
          </View>
        )}

       

        <Text className="text-lg font-semibold mb-4">Preferences</Text>

        <TouchableOpacity
          onPress={() => handleGoToProfile()}
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
        >
          <View className="flex-row items-center">
            <User className="w-6 h-6 text-gray-600 mr-3" />
            <View>
              <Text className="font-semibold">User Profile</Text>
              <Text className="text-sm text-gray-500">
                Email, Phone, Addresses, and Identity
              </Text>
            </View>
          </View>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </TouchableOpacity>

        <Link href="/settingPages/Security" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Shield className="w-6 h-6 text-gray-600 mr-3" />
              <View>
                <Text className="font-semibold">Security and Privacy</Text>
                <Text className="text-sm text-gray-500">
                  Passcode, Fingerprints, and Privacy
                </Text>
              </View>
            </View>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </TouchableOpacity>
        </Link>

        <Link href="/AllTransactionPage" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
              <View>
                <Text className="font-semibold">Payment</Text>
                <Text className="text-sm text-gray-500">
                  All Transaction history
                </Text>
              </View>
            </View>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/MyContest" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Swords className="w-6 h-6 text-gray-600 mr-3" />
              <View>
                <Text className="font-semibold">Past Contests</Text>
                <Text className="text-sm text-gray-500">
                  Previous contests, matches, and other details
                </Text>
              </View>
            </View>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </TouchableOpacity>
        </Link>

        <Link href="/settingPages/Support" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <HelpCircle className="w-6 h-6 text-gray-600 mr-3" />
              <View>
                <Text className="font-semibold">Help and Support</Text>
                <Text className="text-sm text-gray-500">
                  For any question, contact us
                </Text>
              </View>
            </View>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          onPress={() => handleSignOut()}
          className="flex-row items-center justify-between py-3 mt-4"
        >
          <View className="flex-row items-center">
            <LogOut className="w-6 h-6 text-red-500 mr-3" />
            <Text className="font-semibold text-red-500">Log out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Setting;
