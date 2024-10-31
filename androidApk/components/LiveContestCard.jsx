import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';

const LiveContestCard = ({ myContests, teamInContest }) => {
  const handleteam = (contestId) => {
   // console.log("sonu", contestId);
  };
  return (
    <TouchableOpacity
      onPress={() => handleteam(myContests._id)}
      className="m-4 bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <View className="p-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-gray-600 mr-1">🏆 Winners:</Text>
            <Text className="font-bold">0</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-600 mr-1">1st Prize:</Text>
            <Text className="font-bold">
              ₹{myContests.rankPayout[0].prizeAmount}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          <View>
            <Text className="text-gray-500 text-sm">Prize Pool</Text>
            <Text className="font-bold text-lg">₹{myContests.prizePool}</Text>
          </View>
          <View>
            <Text className="text-gray-500 text-sm">Spot</Text>
            <Text className="font-bold text-lg">
              {myContests.numberOfSpots}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500 text-sm">Entry Fee</Text>
            <Text className="font-bold text-lg">₹ {myContests.entryFee}</Text>
          </View>
        </View>
      </View>

      {/* Team Entry */}
      <View className="p-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-gray-100 rounded items-center justify-center">
            <Text>T{teamInContest}</Text>
          </View>
          <Text className="ml-2 font-medium">ggseggg</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="mr-4 font-bold">170</Text>
          <View className="flex-row items-center">
            <Text className="text-gray-600">#6</Text>
            <Text className="text-green-500 ml-1">▲</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LiveContestCard