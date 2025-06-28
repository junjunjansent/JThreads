const User = require("../models/User");
const { ApiError } = require("../utils/errorHandler");
const { getUserFromRequest, createJWT } = require("../utils/tokenHandler");
const {
  bcryptPassword,
  isPasswordBCryptValidated,
} = require("../utils/bcrypt");

// REMOVED due users shouldnt be able to get other Users' details
// const show = async (req, res, next) => {
//   try {
//     const { userUsername } = req.params;
//     const userExisting = await User.findOne({ username: userUsername }).select(
//       "username profilePhoto createdAt"
//     );
//     res.status(200).json({ user: userExisting });
//   } catch (err) {
//     next(err);
//   }
// };

const showOwner = async (req, res, next) => {
  try {
    const user = getUserFromRequest(req);
    const userFull = await User.findById(user._id);
    res.status(200).json({ user: userFull });
  } catch (err) {
    next(err);
  }
};

const updateOwner = async (req, res, next) => {
  // note need to create token so that user can stay logged in
  try {
    const {
      username,
      email,
      firstName,
      lastName,
      birthday,
      gender,
      phoneNumber,
      profilePhoto,
      defaultShippingAddress,
    } = req.body;

    const usernamesExisting = await User.find({ username }).select("username");
    if (usernamesExisting.length > 1) {
      throw new ApiError({
        status: 409,
        source: { pointer: "publicController.js" },
        title: "Conflict: User Exists",
        detail: "Username already taken.",
      });
    }

    const emailsExisting = await User.find({ email }).select("username");
    if (emailsExisting.length > 1) {
      throw new ApiError({
        status: 409,
        source: { pointer: "publicController.js" },
        title: "Conflict: User Exists",
        detail: "Email already taken.",
      });
    }

    const user = getUserFromRequest(req);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        username,
        email,
        firstName,
        lastName,
        birthday,
        gender,
        phoneNumber,
        profilePhoto,
        defaultShippingAddress,
      },
      { new: true }
    ).select("username profilePhoto createdAt");

    // Ensures user details are saved in frontend - with id, username, and email, createdAt
    const userToken = await createJWT({ user: updatedUser });
    if (!userToken) {
      throw new ApiError({
        status: 503,
        source: { pointer: "publicController.js" },
        title: "Service Unavailable: Token Generation",
        detail: "Server having issue generating token.",
      });
    }

    console.log(userToken);
    console.log("i am here");

    res.status(201).json({ user: updatedUser, token: userToken });
  } catch (err) {
    next(err);
  }
};

const updateOwnerPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = getUserFromRequest(req);
    const userFull = await User.findById(user._id);

    if (
      !userFull ||
      !isPasswordBCryptValidated(oldPassword, userFull.password)
    ) {
      throw new ApiError({
        status: 400,
        source: { pointer: "userController.js" },
        title: "Bad Request: Wrong Password",
        detail: "Wrong old password provided.",
      });
    }

    // const updatedUser = await User.findByIdAndUpdate(
    //   user._id,
    //   { ...userFull, password: bcryptPassword(newPassword) },
    //   { new: true }
    // );
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        password: bcryptPassword(newPassword),
      },
      { new: true }
    );

    res.status(201).json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  showOwner,
  updateOwner,
  updateOwnerPassword,
};
