import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";

export const getBalance = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return sendResponse(res, 400, "User ID is required");

    const user = await userSchema.findOne({ userId: userId });

    if (!user) return sendResponse(res, 404, "No user found");

    const myBalance = user.balance;

    sendResponse(res, 200, { myBalance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    sendResponse(res, 500, "Server error");
  }
};
