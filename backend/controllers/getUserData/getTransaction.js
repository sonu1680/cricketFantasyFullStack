import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";

export const getTransaction = async (req, res) => {
  try {
    const { userId, transactionLength } = req.query;
//console.log(transactionLength);
    const user = await userSchema.findOne({ userId: userId });

    if (!user) {
      return sendResponse(res, 404, "No user found");
    }

    let transactions;
    const totalTransactions = user.transactions.length;

    if (transactionLength === "true") {
      transactions = user.transactions;
    } else {
      transactions = user.transactions.slice(
        Math.max(totalTransactions - 20, 0)
      );
    }
    return sendResponse(res, 200, {
      transactions,
     
    });
  } catch (error) {
    console.log("Error in getTransaction:", error);
    return sendResponse(res, 500, "Internal server error");
  }
};
