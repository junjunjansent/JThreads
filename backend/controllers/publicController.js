const User = require("../models/User");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariation");
const { ApiError } = require("../utils/errorHandler");
const {
  bcryptPassword,
  isPasswordBCryptValidated,
} = require("../utils/bcrypt");
const { createJWT } = require("../utils/tokenHandler");

const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!/^[a-z0-9_-]+$/.test(username)) {
      throw new ApiError({
        status: 400,
        source: { pointer: "publicController.js" },
        title: "Bad Request: Username Format",
        detail:
          "Username can only contain lowercase letters, numbers, hyphens, and underscores.",
      });
    }

    if (!/^[-.\w]+@[-.\w]+\.[-.\w]{2,}$/.test(email)) {
      throw new ApiError({
        status: 400,
        source: { pointer: "publicController.js" },
        title: "Bad Request: Email Format",
        detail: "Email needs to be in correct format.",
      });
    }

    const usernameExisting = await User.findOne({ username }).select(
      "username"
    );
    if (usernameExisting) {
      throw new ApiError({
        status: 409,
        source: { pointer: "publicController.js" },
        title: "Conflict: User Exists",
        detail: "Username already taken.",
      });
    }

    const emailExisting = await User.findOne({ email }).select("username");
    if (emailExisting) {
      throw new ApiError({
        status: 409,
        source: { pointer: "publicController.js" },
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

    // Login user - with id, username, and email, createdAt
    const userToken = await createJWT({ user: newUser });
    if (!userToken) {
      throw new ApiError({
        status: 503,
        source: { pointer: "publicController.js" },
        title: "Service Unavailable: Token Generation",
        detail: "Server having issue generating token.",
      });
    }

    res.status(201).json({ user: newUser, token: userToken });
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
    }).select("username password createdAt profilePhoto");

    if (!oneUser || !isPasswordBCryptValidated(password, oneUser.password)) {
      throw new ApiError({
        status: 400,
        source: { pointer: "publicController.js" },
        title: "Bad Request: Wrong Login Details",
        detail: "Login Failed with wrong login details.",
      });
    }

    // Login user - with id, username, and email, createdAt
    const userToken = await createJWT({ user: oneUser });

    if (!userToken) {
      throw new ApiError({
        status: 503,
        source: { pointer: "publicController.js" },
        title: "Service Unavailable: Token Generation",
        detail: "Server having issue generating token.",
      });
    }

    res.status(200).json({ user: oneUser, token: userToken });
  } catch (err) {
    next(err);
  }
};

const showUser = async (req, res, next) => {
  try {
    const { userUsername } = req.params;
    const userExisting = await User.findOne({ username: userUsername }).select(
      "username createdAt profilePhoto"
    );
    res.status(200).json({ user: userExisting });
  } catch (err) {
    next(err);
  }
};

const indexProducts = async (req, res, next) => {
  // checking what type of req is being sent
  try {
    // if the request URL includes "products" API fetch is for all products
    if (req.url.includes("products")) {
      const { search } = req.query;
      let findQuery = {};
      if (search) {
        findQuery.$or = [
          { productName: { $regex: search, $options: "i" } },
          { productCategory: { $regex: search, $options: "i" } },
        ];
      }
      const allProducts = await Product.find(findQuery).populate(
        "productOwner"
      );
      res.json({ product: allProducts });
    }
    const { userUsername } = req.params;
    const { search } = req.query;
    const user = await User.findOne({ username: userUsername });
    let findQuery = {
      productOwner: user._id,
    };

    // else, we assume that the request is for a specific user's products
    if (search) {
      findQuery.$or = [
        { productName: { $regex: search, $options: "i" } },
        { productCategory: { $regex: search, $options: "i" } },
      ];
    }
    const allProducts = await Product.find(findQuery).populate("productOwner");
    res.json({ product: allProducts });
  } catch (err) {
    console.error("Error in indexSearchProducts:", err);
    next(err);
  }
};

// const indexProducts = async (req, res, next) => {
//   const { search } = req.query;
//   try {
//     let findQuery = {};
//     if (search) {
//       findQuery.$or = [
//         { productName: { $regex: search, $options: "i" } },
//         { productCategory: { $regex: search, $options: "i" } },
//       ];
//     }
//     const allProducts = await Product.find(findQuery).populate("productOwner");
//     res.json(allProducts);
//   } catch (err) {
//     console.error("Error in indexSearchProducts:", err);
//     next(err);
//   }
// };

// const indexUserProducts = async (req, res, next) => {
//   try {
//     const { userUsername } = req.params;
//     const { search } = req.query;
//     const user = await User.findOne({ username: userUsername });
//     let findQuery = {
//       productOwner: user._id,
//     };
//     if (search) {
//       findQuery.$or = [
//         { productName: { $regex: search, $options: "i" } },
//         { productCategory: { $regex: search, $options: "i" } },
//       ];
//     }
//     const userProducts = await Product.find(findQuery).populate("productOwner");

//     res.json(userProducts);
//   } catch (err) {
//     next(err);
//   }
// };

const showOneIndex = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const oneProductIndex = await Product.findById({ _id: productId }).populate(
      "productOwner"
    );
    res.json(oneProductIndex);
  } catch (err) {
    next(err);
  }
};

const showVariantIndex = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const variantIndex = await ProductVariant.find({
      mainProduct: productId,
    });
    res.json(variantIndex);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  showUser,
  indexProducts,
  // indexUserProducts,
  showOneIndex,
  showVariantIndex,
};
