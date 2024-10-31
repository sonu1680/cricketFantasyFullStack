import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY;

export const verifyToken = async (req, res, next) => {
  try {
    let data = req.headers.authorization;
   // console.log(req.headers,"middleware")
    if (!data) {
      return res.status(401).send({ error: "Authorization header missing" });
    }

    const token = data.startsWith("Bearer ") ? data.slice(7) : data;
    const decoded = jwt.verify(token, jwtSecret);

    if (
      req.method === "POST"
    ) {
      req.body.userId = decoded.userId; 
    } else if (req.method === "GET") {
      req.query.userId = decoded.userId; 
    }

    next(); 
  } catch (error) {
    res.status(401).send({ error: "Invalid or expired token" });
  }
};
