import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsHeader from "../components/TabsHeader";

const Notification = () => {
  return (
    <SafeAreaView className="flex flex-1" >
      <TabsHeader />
      <View className="flex flex-1 flex-row justify-center items-center ">
        <Text className="font-popSb text-lg">No Notification!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
