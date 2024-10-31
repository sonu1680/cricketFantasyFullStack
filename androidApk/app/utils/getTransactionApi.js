import axios from "axios";
import { axiosRequest } from "./axiosRequest";

export const getTransaction = async (allTrx) => {
  const allTransaction = allTrx||false ;
  try {
    // const url = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/user/getTransaction?userId=${userId}&transactionLength=${allTransaction}`;
    // const res = await axios.get(url);
    const res = await axiosRequest.get(`/user/getTransaction?transactionLength=${allTransaction}`);
    const data = res.data?.message?.transactions || [];
    //console.log(data.length)
    return data;
  } catch (error) {
    console.log("Error fetching balance:", error);
  }
};
