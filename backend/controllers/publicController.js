const User = require("../models/User");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");
const { ApiError } = require("../utils/errorHandler");
const {
  bcryptPassword,
  isPasswordBCryptValidated,
} = require("../utils/bcrypt");
const { createJWT } = require("../utils/tokenHandler");
const {
  usernameValidator,
  emailValidator,
  passwordValidator,
} = require("../utils/inputValidator");

const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    usernameValidator(username);
    emailValidator(email);
    passwordValidator(password);

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

    // Password Checker
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
  try {
    const isGlobalProductsRequest = req.url.includes("products");
    const { search } = req.query;
    let findQuery = {};
    let products;

    // if search query is provided, add to findQuery
    if (search) {
      findQuery.$or = [
        { productName: { $regex: search, $options: "i" } },
        { productCategory: { $regex: search, $options: "i" } },
      ];
    }
    // if it is not a global products request, but rather a specific seller's page request, additional filter to search by user
    if (!isGlobalProductsRequest) {
      const { userUsername } = req.params;
      const user = await User.findOne({ username: userUsername });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      findQuery.productOwner = user._id;
    }

    // Once all conditions are set, we can do a fetch products API call
    const allProducts = await Product.find(findQuery)
      .populate({
        path: "productOwner",
        select: "username _id",
      })
      .lean();

    // Aggregate variant stats and map them to products
    const variantStats = await ProductVariant.aggregate([
      {
        $group: {
          _id: "$mainProduct",
          minPrice: { $min: "$productVarPrice" },
          maxPrice: { $max: "$productVarPrice" },
          availableQuantity: { $sum: "$productVarAvailableQty" },
        },
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          minPrice: 1,
          maxPrice: 1,
          availableQuantity: 1,
        },
      },
    ]);

    const statsMap = new Map(
      variantStats.map((stat) => [stat.productId.toString(), stat])
    );

    products = allProducts.map((product) => {
      const stats = statsMap.get(product._id.toString());
      return stats
        ? {
            ...product,
            variantMinPrice: stats.minPrice,
            variantMaxPrice: stats.maxPrice,
            availableQuantity: stats.availableQuantity,
          }
        : product;
    });
    res.json({ product: products });
  } catch (err) {
    console.error("Error in indexProducts:", err);
    next(err);
  }
};

// const indexProducts = async (req, res, next) => {
//   try {
//     const isGlobalProductsRequest = req.url.includes("products");
//     const { search } = req.query;
//     let findQuery = {};
//     let products;

//     if (isGlobalProductsRequest) {
//       if (search) {
//         findQuery.$or = [
//           { productName: { $regex: search, $options: "i" } },
//           { productCategory: { $regex: search, $options: "i" } },
//         ];
//       }

//       const allProducts = await Product.find(findQuery)
//         .populate({
//           path: "productOwner",
//           select: "username _id",
//         })
//         .lean();

//       // Aggregate variant stats and map them to products
//       const variantStats = await ProductVariant.aggregate([
//         {
//           $group: {
//             _id: "$mainProduct",
//             minPrice: { $min: "$productVarPrice" },
//             maxPrice: { $max: "$productVarPrice" },
//             availableQuantity: { $sum: "$productVarAvailableQty" },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             productId: "$_id",
//             minPrice: 1,
//             maxPrice: 1,
//             availableQuantity: 1,
//           },
//         },
//       ]);

//       const statsMap = new Map(
//         variantStats.map((stat) => [stat.productId.toString(), stat])
//       );

//       products = allProducts.map((product) => {
//         const stats = statsMap.get(product._id.toString());
//         return stats
//           ? {
//               ...product,
//               variantMinPrice: stats.minPrice,
//               variantMaxPrice: stats.maxPrice,
//               availableQuantity: stats.availableQuantity,
//             }
//           : product;
//       });
//     } else {
//       const { userUsername } = req.params;
//       const user = await User.findOne({ username: userUsername });

//       if (!user) {
//         return res.status(404).json({ message: "User not found." });
//       }

//       findQuery.productOwner = user._id;

//       if (search) {
//         findQuery.$or = [
//           { productName: { $regex: search, $options: "i" } },
//           { productCategory: { $regex: search, $options: "i" } },
//         ];
//       }

//       products = await Product.find(findQuery).populate({
//         path: "productOwner",
//         select: "username _id",
//       });
//     }

//     res.json({ product: products });
//   } catch (err) {
//     console.error("Error in indexProducts:", err);
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
