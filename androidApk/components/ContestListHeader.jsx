import { View, Text } from 'react-native'
import React from 'react'

const ContestListHeader = ({ contestType,title }) => {
  return (
    <View className="mt-6  ">
      <View className="line  w-full h-2 bg-green-400 "></View>
      <Text className="text-xl text-black font-bold capitalize ">
        {contestType}
      </Text>
      <Text className="text-sm text-black font-semibold capitalize ">
        {title}
      </Text>
    </View>
  );
};

export default ContestListHeader