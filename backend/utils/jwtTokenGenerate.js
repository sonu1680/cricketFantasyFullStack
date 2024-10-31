import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY;
export const generateToken = async (phone) => {
  const token = jwt.sign({ userId: phone }, jwtSecret, { expiresIn: "10d" });
  return token;
};
