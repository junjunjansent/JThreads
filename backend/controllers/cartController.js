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

const updateCart = async (req, res, next) => {
  try {
    // qtyChange: number | "reset"
    const { item, qtyChange } = req.body;
    const user = getUserFromRequest(req);
    const cart = await Cart.findOne({ buyer: user._id });

    if (item && qtyChange) {
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

module.exports = { showCart, updateCart };
