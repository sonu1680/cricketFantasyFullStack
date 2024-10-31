import { View, Text } from 'react-native'
import React from 'react'

const EmptyList = () => {
  return (
    <View className="w-screen  h-screen bg-primary flex justify-center items-center " >  
      <Text className="text-3xl text-textprimary" >Loading...</Text>
    </View>
  )
}

export default EmptyList