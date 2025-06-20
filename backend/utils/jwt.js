import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const getTokenFromReq = (req) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return null;
  }
  return authHeader.split(" ")[1];
};

// takes in object or string
const createJWT = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Check JWT_SECRET definition");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2 days",
  });
  return token;
};

// takes in string
const decodeJWT = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Check JWT_SECRET definition");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

export { getTokenFromReq, createJWT, decodeJWT };
