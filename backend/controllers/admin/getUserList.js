import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";

export const getUserList=async(req,res)=>{
try {
    
const users = await userSchema.find(
  {},
  {
    userId: 1,
    "userProfile.emailId": 1,
    "userProfile.firstName": 1,
    "userProfile.address": 1,
    "userProfile.profileImage": 1,
  }
);
return sendResponse(res,200,users)
} catch (error) {
    return sendResponse(res,500,"Internal server error")
}
}