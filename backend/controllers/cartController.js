const Cart = require("../models/Cart");
const { ApiError } = require("../utils/errorHandler");
const { getUserFromRequest } = require("../utils/tokenHandler");

const showCart = async (req, res, next) => {
  try {
    const user = getUserFromRequest(req);
    const cart = await Cart.findOne({ buyer: user._id });
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
    const user = getUserFromRequest(req);
    const cart = await Cart.findOne({ buyer: user._id });

    if (itemId && qtyChange) {
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
      { new: true }
    );

    res.status(201).json({ user: updatedCart });
  } catch (err) {
    next(err);
  }
};

const destroyCart = async (req, res, next) => {
  try {
    const user = getUserFromRequest(req);
  } catch (err) {
    next(err);
  }
};

module.exports = { showCart, createCart, updateCart, destroyCart };
