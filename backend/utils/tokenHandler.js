const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const getTokenFromReq = (req) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return null;
  }
  return authHeader.split(" ")[1];
};

const saveUserToRequest = (req, decodedUser) => {
  req.user = decodedUser;
};

const getUserFromRequest = (req) => {
  return req.user;
};

// takes in object or string
const createJWT = async (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Check JWT_SECRET definition");
  }
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });
  return token;
};

// takes in string
const decodeJWT = async (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Check JWT_SECRET definition");
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = {
  getTokenFromReq,
  createJWT,
  decodeJWT,
  saveUserToRequest,
  getUserFromRequest,
};
