// app/change-passcode.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Eye } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

const  PasswordReset=()=> {
  const [oldPasscode, setOldPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");

  return (
    <SafeAreaView className="flex-1 ">
      <Header></Header>
      <View className="flex-1 bg-white p-4 ">
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Enter Old Passcode</Text>
          <View className="flex-row items-center border-b border-gray-300">
            <TextInput
              className="flex-1 py-2"
              secureTextEntry
              value={oldPasscode}
              onChangeText={setOldPasscode}
              placeholder="••••••••••••••"
            />
            <Eye className="w-6 h-6 text-gray-400" />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">
            Create New Passcode
          </Text>
          <View className="flex-row items-center border-b border-gray-300">
            <TextInput
              className="flex-1 py-2"
              secureTextEntry
              value={newPasscode}
              onChangeText={setNewPasscode}
              placeholder="••••••••••••••"
            />
            <Eye className="w-6 h-6 text-gray-400" />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">
            Re-enter New Passcode
          </Text>
          <View className="flex-row items-center border-b border-gray-300">
            <TextInput
              className="flex-1 py-2"
              secureTextEntry
              value={confirmPasscode}
              onChangeText={setConfirmPasscode}
              placeholder="••••••••••••••"
            />
            <Eye className="w-6 h-6 text-gray-400" />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm text-gray-600 mb-1">
            Create a passcode that:
          </Text>
          <Text className="text-sm text-gray-600">
            ✓ Is minimum 8 characters long
          </Text>
          <Text className="text-sm text-gray-600">
            ✓ Has both lower (a-z) and upper case letters (A-Z)
          </Text>
          <Text className="text-sm text-red-500">
            ✗ Has at least one number (0-9) or symbol
          </Text>
          <Text className="text-sm text-gray-600">
            ✓ Does not contain common names or email address
          </Text>
          <Text className="text-sm text-gray-600">
            ✓ Is not a commonly used passcode
          </Text>
        </View>

       

        <TouchableOpacity className="mt-4">
          <Text className="text-blue-500 text-center">Take me back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default PasswordReset;;