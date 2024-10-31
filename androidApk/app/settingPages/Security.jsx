// app/security-privacy.js
import React from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";
import {
  Lock,
  Mail,
  MapPin,
  Bell,
  Download,
  ChevronRight,
} from "lucide-react-native";
import TabsHeader from "../../components/TabsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

const  SecurityPrivacyScreen=()=> {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header></Header>
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4">Security Status</Text>

        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Lock className="w-6 h-6 text-gray-600 mr-3" />
            <View>
              <Text className="font-semibold">Two-Factor Authentication</Text>
              <Text className="text-sm text-gray-500">
                Requires OTP to login besides passcode
              </Text>
            </View>
          </View>
          <Switch />
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <Lock className="w-6 h-6 text-gray-600 mr-3" />
            <Text className="font-semibold">Secure Launch</Text>
          </View>
          <Switch value={true} />
        </View>

        <Text className="text-lg font-semibold mt-6 mb-4">
          Login and Passcode
        </Text>

        <Link href="/settingPages/PasswordReset" asChild>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Lock className="w-6 h-6 text-gray-600 mr-3" />
              <Text className="font-semibold">Change Passcode</Text>
            </View>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <View className="flex-row items-center">
            <Mail className="w-6 h-6 text-gray-600 mr-3" />
            <Text className="font-semibold">Reference Email</Text>
          </View>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold mt-6 mb-4">Privacy</Text>

        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <MapPin className="w-6 h-6 text-gray-600 mr-3" />
            <Text className="font-semibold">Location</Text>
          </View>
          <Switch />
        </View>

        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <View className="flex-row items-center">
            <Bell className="w-6 h-6 text-gray-600 mr-3" />
            <Text className="font-semibold">Notifications</Text>
          </View>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <View className="flex-row items-center">
            <Download className="w-6 h-6 text-gray-600 mr-3" />
            <Text className="font-semibold">Download Data</Text>
          </View>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </TouchableOpacity>

    
      </View>
    </SafeAreaView>
  );
}
export default SecurityPrivacyScreen;