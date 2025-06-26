const User = require("../models/User");
const { ApiError } = require("../utils/errorHandler");
const {
  bcryptPassword,
  isPasswordBCryptValidated,
} = require("../utils/bcrypt");
const { createJWT } = require("../utils/tokenHandler");

const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const usernameExisting = await User.findOne({ username }).select(
      "username"
    );
    if (usernameExisting) {
      throw new ApiError({
        status: 409,
        source: { pointer: "authController.js" },
        title: "Conflict: User Exists",
        detail: "Username already taken.",
      });
    }

    const emailExisting = await User.findOne({ email }).select("username");
    if (emailExisting) {
      throw new ApiError({
        status: 409,
        source: { pointer: "authController.js" },
        title: "Conflict: User Exists",
        detail: "Email already taken.",
      });
    }

    const newUser = await User.create({
      username: username,
      password: bcryptPassword(password),
      email: email,
    });
    // JANSEN COMMENTS - all these should be optional first
    //   firstname: req.body.firstname,
    //   lastname: req.body.lastname,
    //   birthday: req.body.age,

    //   gender: req.body.gender,
    //   phoneNumber: req.body.phoneNumber, // not sure why this is not being captured in mongo

    // JANSEN COMMENTs - no need for sign in
    // const payload = { username: newUser.username, _id: newUser._id };
    // const token = createJWT(payload);

    res.status(201).json({ data: { user: newUser } });
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    console.log(req.body);
    const { usernameOrEmail, password } = req.body;
    const oneUser = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("username email password createdAt");

    if (!oneUser || !isPasswordBCryptValidated(password, oneUser.password)) {
      throw new ApiError({
        status: 400,
        source: { pointer: "authController.js" },
        title: "Bad Request: Wrong Login Details",
        detail: "Login Failed with wrong login details.",
      });
    }

    // Login user - with id, username, and email, createdAt
    const userToken = await createJWT({ user: oneUser });

    if (!userToken) {
      throw new ApiError({
        status: 503,
        source: { pointer: "authController.js" },
        title: "Service Unavailable: Token Generation",
        detail: "Server having issue generating token.",
      });
    }

    res.status(200).json({ data: { user: { oneUser, token: userToken } } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, signIn };
