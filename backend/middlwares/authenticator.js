const {
  getTokenFromReq,
  decodeJWT,
  saveUserToRequest,
} = require("../utils/tokenHandler");
const { ApiError } = require("../utils/errorHandler");

function authenticateUser(req, res, next) {
  try {
    const token = getTokenFromReq(req);
    if (!token) {
      throw new ApiError({
        status: 401,
        source: { pointer: "Authorization Header" },
        title: "Unauthorized",
        detail: "Unable to get token from Authorization Header",
      });
    }
    const decoded = decodeJWT(token);
    if (!decoded.user) {
      throw new ApiError({
        status: 401,
        source: { pointer: "Token that was provided" },
        title: "Unauthorized",
        detail: "Invalid token payload",
      });
    }

    saveUserToRequest(req, decoded.user);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticateUser;
