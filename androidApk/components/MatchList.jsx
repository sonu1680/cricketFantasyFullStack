import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { usePlayerStore } from "../app/utils/store";

const MatchList = ({ match, myContestDetails, isMyContest }) => {
  const router = useRouter();
  const [myContestDetail, setMyContestDetail] = useState(myContestDetails);

  useEffect(() => {
    if (myContestDetails) {
      setMyContestDetail(myContestDetails);
    }
  }, [myContestDetails]);

  const setHeaderData = usePlayerStore((state) => state.setHeaderData);

  const matchTime = new Date(match.matchDetails[0].matchStartTimestamp);
  const currentTime = new Date();
  const timeDifference = matchTime - currentTime;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  let matchTimeRemaining =
    hours > 12 && hours < 24
      ? "Today"
      : hours > 24 && hours < 48
      ? "Tomorrow"
      : `${hours}h ${minutes}m`;

  if (hours <= 0 && minutes <= 0) {
    matchTimeRemaining = match.matchState;
  }

  const handleNavigation = ({ matchId, matchTimeRemaining }) => {
    setHeaderData({
      matchId: matchId,
      teamVerses: match.teamVerses,
      matchTimeRemaining: matchTimeRemaining,
    });

    if (isMyContest) {
      router.push({
        pathname: "LiveScorePage",
        params: { match, myContestDetails },
      });
    } else {
      router.push({
        pathname: "(contestTabs)/Contest",
        params: { matchId: matchId, matchTimeRemaining: matchTimeRemaining },
      });
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 130,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginVertical: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
      }}
      onPress={() =>
        handleNavigation({
          matchId: match.matchId,
          matchTimeRemaining: matchTimeRemaining,
        })
      }
    >
      {/* Upper Section */}
      <View style={{ alignItems: "center", marginBottom: 5 }}>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#606060" }}>
          {match.seriesName}
        </Text>
      </View>

      {/* Middle Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        {/* Team 1 */}
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <View
            style={{
              marginRight: 5,
              borderRadius: 30,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#f0f0f0",
            }}
          >
            <Image
              source={
                match.matchDetails[0].team1.teamLogo
                  ? { uri: match.matchDetails[0].team1.teamLogo }
                  : require("../assets/playerImg.png")
              }
              style={{ width: 50, height: 50 }}
            />
          </View>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            {match.matchDetails[0].team1.shortName}
          </Text>
        </View>

        {/* Match State / Time */}
        {match.matchState == "live" ? (
          <View
            style={{ padding: 5, backgroundColor: "#ffefef", borderRadius: 6 }}
          >
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 14 }}>
              {match.matchState}
            </Text>
          </View>
        ) : match.matchState == "Complete" ? (
          <View
            style={{ padding: 5, backgroundColor: "#eaffef", borderRadius: 6 }}
          >
            <Text style={{ color: "green", fontWeight: "bold", fontSize: 14 }}>
              {match.matchState}
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 12, color: "#808080" }}>
              {new Date(
                match.matchDetails[0].matchStartTimestamp
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#ff6b6b" }}>
              {matchTimeRemaining}
            </Text>
          </View>
        )}

        {/* Team 2 */}
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            {match.matchDetails[0].team2.shortName}
          </Text>
          <View
            style={{
              marginLeft: 5,
              borderRadius: 30,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#f0f0f0",
            }}
          >
            <Image
              source={
                match.matchDetails[0].team2.teamLogo
                  ? { uri: match.matchDetails[0].team2.teamLogo }
                  : require("../assets/playerImg.png")
              }
              style={{ width: 50, height: 50 }}
            />
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderColor: "#f0f0f0",
          paddingTop: 5,
        }}
      >
        <LinearGradient
          colors={["#90ff91", "#d0ffc5", "#edffed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: "45%",
            borderRadius: 6,
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: "#28a745", fontSize: 12, fontWeight: "700" }}>
            {myContestDetail
              ? myContestDetail.teamNo + " Teams"
              : "1 prize ₹1000"}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["#ff9290", "#ffc5c5", "#edffed"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{
            width: "45%",
            borderRadius: 6,
            alignItems: "center",
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: "#ff4d4f", fontSize: 12, fontWeight: "700" }}>
            {myContestDetail
              ? myContestDetail.contestNo + " Contests"
              : "winBike"}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default MatchList;
