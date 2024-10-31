import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import MatchList from "../../components/MatchList";
import Animated, {
  
  FadeInRight,

} from "react-native-reanimated";

const CompletedContests = ({ matchData }) => {
 // console.log(matchData);
if (!matchData || matchData.length == 0) {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text className="font-popB text-gray-500 capitalize ">
        you have not participated in any contests..
      </Text>
    </View>
  );
}

  return (
    <Animated.View
      entering={FadeInRight}
      className="matchListContainer w-screen h-full bg-gray-300 px-2  "
    >
      <FlatList
        data={matchData}
        renderItem={({ item }) => (
          <MatchList
            match={item.matchDetails}
            isMyContest={true}
            myContestDetails={{
              teamNo: item.contestTeamNo || 0, 
              contestNo: item.contestNo || 0, 
              showContestDetails: true, 
            }}
          />
        )}
        keyExtractor={(item) => item.matchDetails._id}
        ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
};

export default CompletedContests;
