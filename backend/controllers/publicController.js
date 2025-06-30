const User = require("../models/User");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");
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

      const allProducts = await Product.find(findQuery)
        .populate({
          path: "productOwner",
          select: "username _id",
        })
        .lean();
      // we pull all variants and group them by mainProductId and then find the min and max variant price
      const variantStats = await ProductVariant.aggregate([
        {
          $group: {
            _id: "$mainProduct", // Group by the mainProduct ID (which is the Product's _id)
            minPrice: { $min: "$productVarPrice" },
            maxPrice: { $max: "$productVarPrice" },
            availableQuantity: { $sum: "$productVarAvailableQty" },
          },
        },
        {
          $project: {
            _id: 0, // Exclude the original _id from the output
            productId: "$_id", // Rename it to productId for clarity
            minPrice: 1,
            maxPrice: 1,
            availableQuantity: 1,
          },
        },
      ]);

      const statsMap = new Map(
        variantStats.map((stat) => [
          stat.productId.toString(), // Use productId (which is the Product's _id) as the key
          {
            minPrice: stat.minPrice,
            maxPrice: stat.maxPrice,
            availableQuantity: stat.availableQuantity,
          },
        ])
      );

      const productsWithStats = allProducts.map((product) => {
        // Look up the min/max prices using the current product's _id
        const stats = statsMap.get(product._id.toString());
        if (stats) {
          // If stats are found, return a new object combining product data
          // with the min/max prices
          return {
            ...product, // Spreads all properties from the original product
            variantMinPrice: stats.minPrice, // Adds the new minPrice field
            variantMaxPrice: stats.maxPrice, // Adds the new maxPrice field
            availableQuantity: stats.availableQuantity, // Adds the available quantity field
          };
        }
        return product; // If no variants or prices found, return the product as is
      });

      res.json({ product: productsWithStats });
    } else {
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
      const allProducts = await Product.find(findQuery).populate({
        path: "productOwner",
        select: "username _id",
      });
      res.json({ product: allProducts });
    }
  } catch (err) {
    console.error("Error in indexSearchProducts:", err);
    next(err);
  }
};

// const indexProducts1 = async (req, res, next) => {
//   // checking what type of req is being sent
//   try {
//     // if the request URL includes "products" API fetch is for all products
//     if (req.url.includes("products")) {
//       const { search } = req.query;
//       let findQuery = {};
//       if (search) {
//         findQuery.$or = [
//           { productName: { $regex: search, $options: "i" } },
//           { productCategory: { $regex: search, $options: "i" } },
//         ];
//       }
//       const allProducts = await Product.find(findQuery).populate(
//         "productOwner"
//       );
//       res.json({ product: allProducts });
//     }
//     const { userUsername } = req.params;
//     const { search } = req.query;
//     const user = await User.findOne({ username: userUsername });
//     let findQuery = {
//       productOwner: user._id,
//     };

//     // else, we assume that the request is for a specific user's products
//     if (search) {
//       findQuery.$or = [
//         { productName: { $regex: search, $options: "i" } },
//         { productCategory: { $regex: search, $options: "i" } },
//       ];
//     }
//     const allProducts = await Product.find(findQuery).populate("productOwner");
//     res.json({ product: allProducts });
//   } catch (err) {
//     console.error("Error in indexSearchProducts:", err);
//     next(err);
//   }
// };

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
