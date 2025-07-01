const Cart = require("../models/Cart");
// const ProductVariant = require("../models/ProductVariant");
const { ApiError } = require("../utils/errorHandler");
const { getUserFromRequest } = require("../utils/tokenHandler");
const { numberRangeValidator } = require("../utils/inputValidator");

const showCart = async (req, res, next) => {
  try {
    const user = getUserFromRequest(req);
    // get all cart details (selected fields) - but mongoose can only do nested populate if defined
    const cart = await Cart.findOne({ buyer: user._id })
      .populate("buyer", "username")
      .populate({
        path: "cartItems.item",
        select:
          "mainProduct productVarDesign productVarAvailableQty productVarPrice productVarDisplayPhoto",
        populate: {
          path: "mainProduct",
          select:
            "productName productIsActive productCategory productOwner productDefaultDeliveryTime",
          populate: { path: "productOwner", select: "username" },
        },
      });

    // "mainProduct": {
    //       "_id": "685faa35a59d22a929ff2ba5",
    //       "productName": "Sausages",
    //       "productIsActive": true,
    //       "productDescription": "Discover the frog-like agility of our Chicken, perfect for ambitious users",
    //       "productCategory": "Headwear",
    //       "productOwner": {
    //         "_id": "685faa34a59d22a929ff2b8f",
    //         "username": "user1",
    //         "email": "123@456.com",
    //         "profilePhoto": "https://www.gravatar.com/avatar/?d=mp",
    //         "createdAt": "2025-06-28T08:39:16.601Z",
    //         "updatedAt": "2025-06-30T08:17:29.256Z",
    //         "__v": 0,
    //         "birthday": null,
    //         "lastName": "a",
    //         "firstName": "1234"
    //       },
    //       "productDisplayPhoto": "https://picsum.photos/seed/jTYok/3430/54?grayscale&blur=2",
    //       "productDefaultDeliveryTime": 30,

    if (!cart) return res.status(200).json({ cart });

    // delete cart if last updated is >15 days ago
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;
    if (Date.now() - cart.updatedAt > fifteenDays) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ cart: null });
    }

    // validate if itemId still exists and delete if it doesnt
    // if item doesnt exist anymore, delete
    // if qty is 0, delete
    // if !item.mainProdocut.isActive, delete
    cart.cartItems = cart.cartItems.filter(
      ({ item, qty }) =>
        item && qty > 0 && item.mainProduct && item.mainProduct.productIsActive
    );
    await cart.save();

    // after clearing items, if cart.
    if (cart.cartItems.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ cart: null });
    }

    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

const createCart = async (req, res, next) => {
  try {
    // qtyChange: number | "reset"
    const { itemId, qtyChange } = req.body;
    const user = getUserFromRequest(req);

    // validate number - want to only add in database if min 1
    numberRangeValidator(qtyChange, 1);

    const newCart = await Cart.create({
      buyer: user._id,
      cartItems: [{ item: itemId, qty: qtyChange }],
    });

    res.status(201).json({ cart: newCart });
  } catch (err) {
    next(err);
  }
};

const updateCart = async (req, res, next) => {
  try {
    // qtyChange: number | "reset"
    const { itemId, qtyChange } = req.body;
    const { cartId } = req.params;
    if (!cartId) {
      throw new ApiError({
        status: 400,
        source: { pointer: "cartController.js" },
        title: "Bad Request: No Cart ID Given",
        detail: "No Cart ID was passed for update.",
      });
    }

    // validate number - want to only add in database if min 1
    numberRangeValidator(qtyChange, 1);

    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new ApiError({
        status: 403,
        source: { pointer: "cartController.js" },
        title: "Forbidden: Cart Not Created",
        detail: "Cart needs to be created before updating.",
      });
    }

    // TODO: need some logic to start saving Qtys as not available if it's in someone's cart (maybe in checkout?)

    // validate if itemId still exists and delete if it doesnt

    if (itemId) {
      throw new ApiError({
        status: 400,
        source: { pointer: "userController.js" },
        title: "Bad Request: Wrong Password",
        detail: "Wrong old password provided.",
      });
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      cart._id,
      {
        // new cart items
      },
      { runValidators: true, new: true }
    );

    res.status(201).json({ cart: updatedCart });
  } catch (err) {
    next(err);
  }
};

const destroyCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    if (!cartId) {
      throw new ApiError({
        status: 400,
        source: { pointer: "cartController.js" },
        title: "Bad Request: No Cart ID Given",
        detail: "No Cart ID was passed for deletion.",
      });
    }

    const deletedCart = await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ cart: deletedCart });
  } catch (err) {
    next(err);
  }
};

module.exports = { showCart, createCart, updateCart, destroyCart };
