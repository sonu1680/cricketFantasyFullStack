import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from "react";
import LeaderBoardList from '../../components/LeaderBoardList'

const data=[{name:"sonu"},{name:"wakeel"},{name:'rahul'}]
const LeaderBoard = () => {
  const [totalTeams, setTotalteams] = useState(0);
  
  useEffect(() => {
    setTotalteams(data.length); 
  }, [data]); 

  return (
    <>
      <View className="container w-full h-8 flex flex-row justify-start pl-6 items-center  ">
        <Text className="title text-md text-gray-400 font-semibold ">
          AllTeams ({totalTeams})
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item, index }) => <LeaderBoardList name={item} />}
      />
    </>
  );
}

export default LeaderBoard