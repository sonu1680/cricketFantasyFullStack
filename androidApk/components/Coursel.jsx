import { View, Text, Image } from 'react-native'
import React from 'react'

const Coursel = () => {
  return (
    <View className="coursel w-full h-32  flex justify-between">
      <View className="coursel w-full h-20 pt-2 ">
        <Image
          source={require("../assets/banner.png")}
          className=" w-full h-full rounded-xl "
          resizeMode="cover"
        />
      </View>
      <Text className=" text-lg font-popSb  ">Upcoming Matches</Text>
    </View>
  );
}

export default Coursel