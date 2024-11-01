import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionList from "../../components/TransactionList";
import TabsHeader from "../../components/TabsHeader";
import { useRouter } from "expo-router";
import { usePlayerStore } from "../utils/store";
import { getBalance } from "../utils/getBalanceApi";
import { getTransaction } from "../utils/getTransactionApi";

const Wallet = () => {
  const setBalance = usePlayerStore((state) => state.setBalance);
  const [tempTrxData, setTempTrxData] = useState(null);
  const [myBalance, setMyBalance] = useState(
    usePlayerStore((state) => state.balance)
  );
  const [myTransaction, setMyTransactions] = useState(null);
  const [filterBtn, setFilterBtn] = useState("All");
  const router = useRouter();

  // Fetch balance and transactions
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        setMyBalance(balance);
        setBalance(balance);

        const transactions = await getTransaction();
        setTempTrxData(transactions);
        setMyTransactions(transactions);
        // console.log(transactions);
      } catch (error) {
        //console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [setBalance]);

  // Handle action (Deposit/Withdraw)
  const handleAction = useCallback(
    (action) => {
      router.push({
        pathname: "Payment",
        params: { type: action },
      });
    },
    [router]
  );

  // Handle filter (All, Deposit, Withdraw)
  const handleFilterPress = useCallback(
    (filter) => {
      setFilterBtn(filter);
      if (tempTrxData) {
        const filteredTrx =
          filter === "All"
            ? tempTrxData
            : tempTrxData.filter((e) => e.transactionType === filter);

        setMyTransactions(filteredTrx);
      }
    },
    [tempTrxData]
  );
  const handleseeAllTrx = () => {
    router.push("AllTransactionPage");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabsHeader />
      <View style={{ flex: 1, backgroundColor: "#F9FAFB", padding: 8 }}>
        {/* Balance and Profile Section */}
        <View
          style={{
            backgroundColor: "#DC2626",
            padding: 20,
            borderRadius: 24,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#FFF", fontSize: 28, fontWeight: "bold" }}>
                ₹{myBalance}
              </Text>
              <Text style={{ color: "#FFF", fontSize: 12 }}>
                Available Balance
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 24,
            }}
          >
            {["Deposit", "Withdraw"].map((action) => (
              <TouchableOpacity
                key={action}
                style={{ alignItems: "center" }}
                onPress={() => handleAction(action)}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "#FFF",
                    borderRadius: 24,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#1F2937", fontWeight: "600" }}>
                    {action[0]}
                  </Text>
                </View>
                <Text style={{ color: "#FFF", fontSize: 12 }}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Recent Transactions
          </Text>
          <TouchableOpacity onPress={() => handleseeAllTrx()}>
            <Text style={{ color: "#3B82F6" }}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Options */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 16,
          }}
        >
          {["All", "Deposit", "Withdraw"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: filterBtn === filter ? "#34D399" : "#FFFFFF",
              }}
              onPress={() => handleFilterPress(filter)}
            >
              <Text
                style={{
                  color: filterBtn === filter ? "#FFFFFF" : "#000000",
                }}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transaction List */}
        <FlatList
          data={myTransaction}
          renderItem={({ item }) => <TransactionList item={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          ListEmptyComponent={
            <View className="flex flex-1 flex-row justify-center items-center mt-[30%] ">
              {myTransaction==null? (
                <ActivityIndicator size={"large"} color={"red"} />
              ) : (
                <Text className="font-popSb text-lg">No transaction found</Text>
              )}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
