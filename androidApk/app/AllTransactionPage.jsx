import { useRouter } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlayerStore } from "./utils/store";
import { getBalance } from "./utils/getBalanceApi";
import { getTransaction } from "./utils/getTransactionApi";
import TransactionList from "../components/TransactionList";
import Header from "../components/Header";

const AllTransactionPage = () => {
  const [tempTrxData, setTempTrxData] = useState(null);
  
  const [myTransaction, setMyTransactions] = useState(null);
  const [filterBtn, setFilterBtn] = useState("All");
  const router = useRouter();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
       

        const transactions = await getTransaction(true);
        setTempTrxData(transactions);
        setMyTransactions(transactions); 
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

 

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
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, backgroundColor: "#F9FAFB", padding: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            All Transactions
          </Text>
        </View>

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
                backgroundColor: filterBtn === filter ? "#34D399" : "#FFF",
              }}
              onPress={() => handleFilterPress(filter)}
            >
              <Text
                style={{
                  color: filterBtn === filter ? "#FFF" : "#000",
                }}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={myTransaction}
          renderItem={({ item }) => <TransactionList item={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
           initialNumToRender={10}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllTransactionPage;
