import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";

export const postTransaction=async(req,res)=>{
    const {
      userId,
      amount,
      date,
      time,
      transactionType,
      paymentMethod,
      subTitle,title
    } = req.body;
    const user=await userSchema.findOne({userId:userId});
    if(!user){
        return sendResponse(res,404,"no user found")
    }

    user.transactions.push({
      amount: amount,
      date: date,
      time: time,
      transactionType: transactionType,
      paymentMethod: paymentMethod,
      title:title,
      subTitle:subTitle
    });
    if (transactionType=="Withdraw"){
      user.balance -= amount;
    }
    else if (transactionType == "Deposit"){
      user.balance += amount;

    }
     await user.save();
    return sendResponse(res,201,"transaction added")
}
