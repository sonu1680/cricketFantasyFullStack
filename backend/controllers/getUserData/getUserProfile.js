import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return sendResponse(res, 400, "User ID is required");
    }

    const profile = await userSchema.findOne(
      { userId: userId },
      {
        "userProfile.firstName": 1,
        "userProfile.lastName": 1,
        "userProfile.emailId": 1,
        "userProfile.address": 1,
        "userProfile.profileImage": 1,
      },
      { upsert: false, new: false, setDefaultsOnInsert: false }
    );

  
    if (!profile) {
      return sendResponse(res, 404, "User not found");
    }

    const profileObj = profile.toObject();
    profileObj.userProfile.phone = userId;

    return sendResponse(res, 200, profileObj);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return sendResponse(res, 500, "Internal server error");
  }
};
