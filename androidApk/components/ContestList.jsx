import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { usePlayerStore } from "../app/utils/store";

const ContestList = ({
  matchId,
  match,
  matchTimeRemaining,
  teamVerses,
  isMycontest,
}) => {
  const router = useRouter();

  const setIstempteam = usePlayerStore((state) => state.setIsTempTeam);

  const handleJoinContest = (match) => {
    setIstempteam({
      isTemp: false,
      matchId: matchId,
      contestId: match._id,
      contestType: match.contestType,
    });

    router.push({
      pathname: "(leaderBoard)/Winnings",
      params: {
        matchTimeReaming: matchTimeRemaining,
        teamVerses: teamVerses,
        isMycontest: isMycontest,
        contest: JSON.stringify(match),
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={(e) => handleJoinContest(match)}
      style={{
        width: "100%",
        height: 140,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginVertical: 8,
        padding: 12,
        justifyContent: "space-between",
      }}
    >
      {/* Upper Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        {/* Left - Prize Pool */}
        <View>
          <Text style={{ color: "#606060", fontSize: 14, fontWeight: "600" }}>
            Max Prize Pool
          </Text>
          <Text style={{ color: "#000", fontSize: 20, fontWeight: "700" }}>
            ₹{match.prizePool}
          </Text>
        </View>
        {/* Right - Entry Fee */}
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: "#606060", fontSize: 14 }}>Entry</Text>
          <View
            style={{
              backgroundColor: "#ff6b6b",
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              ₹{match.entryFee}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Bar Section */}
      <View style={{ width: "100%", marginBottom: 10 }}>
        {/* Progress Bar */}
        <View
          style={{
            height: 8,
            backgroundColor: "#ffefef",
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: 5,
          }}
        >
          <View
            style={{
              width: `${
                ((match.numberOfSpots - 12) / match.numberOfSpots) * 100
              }%`,
              height: "100%",
              backgroundColor: "#ff6b6b",
            }}
          />
        </View>
        {/* Spots Info */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#606060", fontSize: 12 }}>12 Spots Left</Text>
          <Text style={{ color: "#606060", fontSize: 12 }}>
            {match.numberOfSpots} Spots
          </Text>
        </View>
      </View>

      {/* Lower Section - Rank Prize */}
      <LinearGradient
        colors={["#6e100e", "#462121", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 35,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <Ionicons name="podium-outline" size={20} color="white" />
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: "600",
            marginLeft: 5,
          }}
        >
          ₹{match.rankPayout[0].prizeAmount}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ContestList;
