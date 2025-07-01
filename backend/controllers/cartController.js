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

    if (!cart) return res.status(200).json({ cart });

    // delete cart if last updated is >15 days ago
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;
    if (Date.now() - cart.updatedAt > fifteenDays) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ cart: null });
    }

    // validate if itemId still exists and delete if it doesnt
    // if item doesnt exists in Product Var, delete
    // if qty is 0, delete
    // if item's mainProduct doesnt exist Product, delete
    // if !item.mainProduct.isActive, delete
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
    numberRangeValidator(qtyChange, { min: 1 });

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
    // qtyChange: number that is not zero, //qtySet: up to productVarAvailableQty
    const { itemId, qtyChange, qtySet } = req.body;
    const { cartId } = req.params;
    if (!cartId) {
      throw new ApiError({
        status: 400,
        source: { pointer: "cartController.js" },
        title: "Bad Request: No Cart ID Given",
        detail: "No Cart ID was passed for update.",
      });
    }

    // check if cart exists before updating
    const cart = await Cart.findById(cartId);
    if (!cart) {
      throw new ApiError({
        status: 403,
        source: { pointer: "cartController.js" },
        title: "Forbidden: Cart Not Created",
        detail: "Cart needs to be created before updating.",
      });
    }

    const qtyChangeNumber = parseInt(qtyChange);
    const qtySetNumber = parseInt(qtySet);

    if (
      !isNaN(qtyChangeNumber) &&
      qtyChangeNumber !== 0 &&
      isNaN(qtySetNumber)
    ) {
      // only qtyChangeNumber given

      // validate number - want to only add in database if actually a number that isnt zero
      if (qtyChangeNumber > 0)
        numberRangeValidator(qtyChangeNumber, { min: 1 });
      else if (qtyChangeNumber < 0)
        numberRangeValidator(qtyChangeNumber, { max: -1 });
      else {
        throw new ApiError({
          status: 403,
          source: { pointer: "cartController.js" },
          title: "Bad Request: qtyChangeNumber is set to 0",
          detail: "No change to Cart Item Qty.",
        });
      }
    } else if (
      !isNaN(qtySetNumber) &&
      qtySetNumber !== 0 &&
      isNaN(qtyChangeNumber)
    ) {
      // only qtySet given
      numberRangeValidator(qtySetNumber, { min: 0 });

      if (qtySetNumber === 0) {
        // delete the itemId
      } else {
        // check if number is less than productVarAvailableQty
      }
    } else {
      throw new ApiError({
        status: 403,
        source: { pointer: "cartController.js" },
        title: "Forbidden: Too many requests to Qty",
        detail: "Cart Item Qty can only be added/subtracted OR set, not both.",
      });
    }

    // check if itemId exists in cartItems
    if (cart.cartItems.every(({ item }) => item._id !== itemId)) {
      // itemId doesnt exist
      cart.cartItems.push({ item: itemId, qty: qtyChange });
    } else {
      cart.cartItems = cart.cartItems.map(({ item, qty }) => {
        if (item._id === itemId) {
          if (qtyChange === "reset") {
            qty = 0;
          } else if (qtyChange > 0 || qty > qtyChange) {
            qty += qtyChange;
          } else {
            throw new ApiError({
              status: 400,
              source: { pointer: "cartController.js" },
              title:
                "Bad Request: qtyChange must be smaller than current qty in Cart",
              detail: "Wrong old password provided.",
            });
          }
        }
      });
    }

    // TODO: need some logic to start saving Qtys as not available if it's in someone's cart (maybe in checkout?)

    await cart.save();

    // const updatedCart = await Cart.findByIdAndUpdate(
    //   cart._id,
    //   {
    //     // new cart items
    //   },
    //   { runValidators: true, new: true }
    // );

    res.status(201).json({ cart: cart });
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
