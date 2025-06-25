const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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
  if (!jwtSecret) {
    throw new Error("Check JWT_SECRET definition");
  }
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "2 days",
  });
  return token;
};

// takes in string
const decodeJWT = (token) => {
  if (!jwtSecret) {
    throw new Error("Check JWT_SECRET definition");
  }
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
};

module.export = { getTokenFromReq, createJWT, decodeJWT };
