import { View, Text, Image } from 'react-native'
import React from 'react'

const LeaderBoardList = ({name}) => {
   // console.log(name)
  return (
    <View className="title w-full h-16 flex  justify-start flex-row pl-4 gap-x-4 border-[1px] border-gray-300/20 shadow-sm shadow-gray-200 items-center   ">
      <Image
        source={require("../assets/playerImg.png")}
        className="w-8 h-8 rounded-full "
        resizeMode={"contain"}
      />
      <Text className="text-md font-semibold text-gray-500 capitalize">
        {name.name}
      </Text>
    </View>
  );
}

export default LeaderBoardList