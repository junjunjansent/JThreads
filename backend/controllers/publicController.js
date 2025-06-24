const User = require("../models/User");
const { ApiError } = require("../utils/errorHandler");
const { bcryptPassword } = require("../utils/bcrypt");
// const { createJWT } = require("../utils/jwt");

const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const userExisting = await User.findOne({ username: username });

    if (userExisting) {
      throw new ApiError({
        status: 409,
        source: { pointer: "publicController.js" },
        title: "User Exists",
        detail: "Username already taken.",
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

    if (!newUser) {
      throw new ApiError({
        status: {
          status: 400,
          source: { pointer: "publicController.js" },
          title: "Invalid User",
          detail: "User could not be created.",
        },
      });
    }

    // JANSEN COMMENTs - no need for sign in
    // const payload = { username: newUser.username, _id: newUser._id };
    // const token = createJWT(payload);

    res.status(201).json({ data: { user: newUser } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// // import { Recipe } from "../models/Recipe";
// import { User } from "../models/User";

// import { bcryptPassword, isPasswordBCryptValidated } from "../utils/bcrypt";
// import { createJWT } from "../utils/jwt";

// const registerUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // should check if username exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       res.status(400).json({ message: "User already exists." });
//       return;
//     }

//     const newUser = await User.create({
//       username,
//       password: bcryptPassword(password),
//     });
//     if (!newUser) {
//       res
//         .status(400)
//         .json({ message: "Could not create user with given info" });
//       return;
//     }
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error, sorry" });
//   }
// };

// const signIn = (res, req, next) => {};

// const loginUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const oneUser = await User.findOne({ username });
//     if (!oneUser || !isPasswordBCryptValidated(password, oneUser.password)) {
//       res.status(401).json({ message: "Login Failed" });
//       return;
//     }
//     // Login user
//     const usernameToken = createJWT({
//       username: oneUser.username,
//       id: oneUser._id,
//     });
//     res
//       .status(200)
//       .json({ message: `Welcome, ${oneUser.username}`, token: usernameToken });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error, sorry" });
//   }
// };

module.exports = { signUp };
