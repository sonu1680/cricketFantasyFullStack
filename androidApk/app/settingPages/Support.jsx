import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';

const Support = () => {
  return (
    <SafeAreaView className="flex flex-1" >
        <Header></Header>
        <View className="flex flex-1 bg-gray-900 justify-center items-center ">

      <Text className="font-popB text-xl text-white" >coming soon...</Text>
        </View>
    </SafeAreaView>
  );
}

export default Support