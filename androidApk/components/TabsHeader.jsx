import { View, Text, TouchableOpacity, Image } from "react-native";
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TabsHeader = () => {
    const router=useRouter();
    const handlePayment = () => {
      router.push("/Payment");
    };

    const handleNotification = () => {
      router.push("/Notification");
    };

  
  return (
    <View className="header h-20 w-screen bg-red-600 flex px-4 flex-row justify-between  items-center ">
      <Image
        source={require("../assets/logo.png")}
        className="w-20 h-14 rounded-md"
      />
      <View className="flex flex-row justify-center items-center ">
       

        <TouchableOpacity
          onPress={() => handlePayment()}
          className="wallet p-1  w-10 h-10  flex justify-center items-center "
        >
          <Ionicons name="wallet-outline" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNotification()}
          className="wallet p-1  w-10 h-10 flex justify-center items-center "
        >
          <Ionicons name="notifications-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TabsHeader