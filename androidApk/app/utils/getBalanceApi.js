import axios from "axios";
import { axiosRequest } from "./axiosRequest";

export const getBalance = async () => {
  try {
    // const url = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/user/getBalance?userId=${userId}`;
    // const res = await axios.get(url);
    const res = await axiosRequest.get("/user/getBalance");
    const data = res.data?.message?.myBalance || 0;
    // console.log(data,"my")
    return data;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};
