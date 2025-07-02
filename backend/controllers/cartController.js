const Cart = require("../models/Cart");
const ProductVariant = require("../models/ProductVariant");
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

    // after clearing items, if cart Items is empty
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
    // qtyChange: number
    const { itemId, qtyChange } = req.body;

    // validate number - want to only add in database if min 1
    const qtyChangeValidated = numberRangeValidator(qtyChange, { min: 1 });

    // const { cartId } = req.params;
    // if (!cartId) {
    //   throw new ApiError({
    //     status: 400,
    //     source: { pointer: "cartController.js" },
    //     title: "Bad Request: No Cart ID Given",
    //     detail: "No Cart ID was passed for update.",
    //   });
    // }

    const user = getUserFromRequest(req);
    const cart = await Cart.findOne({ buyer: user._id }).select("buyer");
    if (cart) {
      throw new ApiError({
        status: 403,
        source: { pointer: "cartController.js" },
        title: "Forbidden: User already has cart",
        detail: "User cannot have two carts.",
      });
    }

    const newCart = await Cart.create({
      buyer: user._id,
      cartItems: [{ item: itemId, qty: qtyChangeValidated }],
    });

    res.status(201).json({ cart: newCart });
  } catch (err) {
    next(err);
  }
};

/**
 * updateCart can check if cart exists - create cart if necessary
 * (1) checks if inputs from body are valid: itemId exists, qtyChange OR qtySet
 * (2) looks to see if cart needs to be created
 * (3) obtains info of item in cartItems
 * (4) sets newQty via validated qtyChange or qtySet
 * (5) updates itme in cartItems
 *
 */
const updateCart = async (req, res, next) => {
  try {
    // qtyChange: number that is not zero, //qtySet: up to productVarAvailableQty
    const { itemId, qtyChange, qtySet } = req.body;

    // quick check only qtyChange or qtySet is given (written like this to handle zeros too)
    const hasQtyChange = qtyChange !== undefined;
    const hasQtySet = qtySet !== undefined;
    if ((hasQtyChange && hasQtySet) || (!hasQtyChange && !hasQtySet)) {
      throw new ApiError({
        status: 400,
        source: { pointer: "cartController.js" },
        title: "Bad Request: Too many requests to Qty",
        detail: "Cart Item Qty can only be added/subtracted OR set, not both.",
      });
    }

    // check if item exists in Shop
    // if item doesnt exists in Product Var, delete
    // if item's mainProduct doesnt exist Product, delete
    // if !item.mainProduct.isActive, delete
    const itemExisting = await ProductVariant.findById(itemId)
      .select("mainProduct productVarAvailableQty")
      .populate({
        path: "mainProduct",
        select: "productIsActive",
      });
    const isExistingItem =
      itemExisting &&
      itemExisting.mainProduct &&
      itemExisting.mainProduct.productIsActive;
    if (!isExistingItem) {
      throw new ApiError({
        status: 410,
        source: { pointer: "cartController.js" },
        title: "Gone: Product Var Item does not Exist",
        detail: "Selected Product Var Item no longer exists.",
      });
    }

    // -------- get all cart details (selected fields) - but mongoose can only do nested populate if defined
    const user = getUserFromRequest(req);
    const cart = await Cart.findOne({ buyer: user._id }).select("cartItems");

    // const { cartId } = req.params;
    // if (!cartId) {
    //   throw new ApiError({
    //     status: 400,
    //     source: { pointer: "cartController.js" },
    //     title: "Bad Request: No Cart ID Given",
    //     detail: "No Cart ID was passed for update.",
    //   });
    // }

    if (!cart) {
      // create cart if it doesnt exist
      const qtyChangeValidated = numberRangeValidator(qtyChange, { min: 1 });
      const newCart = await Cart.create({
        buyer: user._id,
        cartItems: [{ item: itemId, qty: qtyChangeValidated }],
      });
      return res.status(201).json({ cart: newCart });
    }

    // check if item exists in Cart - gets index in cartItems and qty
    // if no item in cart, will need to add new Item
    const itemIndexinCartItems = cart.cartItems.findIndex(({ item }) =>
      item._id.equals(itemId)
    );
    const currentQty =
      itemIndexinCartItems === -1
        ? 0
        : cart.cartItems[itemIndexinCartItems].qty;
    let newQty = currentQty;

    // -------- checking for qtyChange & qty Set
    if (hasQtyChange) {
      const qtyChangeValidated = numberRangeValidator(qtyChange, {
        min: -Infinity,
      });
      if (qtyChangeValidated === 0) {
        throw new ApiError({
          status: 400,
          source: { pointer: "cartController.js" },
          title: "Bad Request: QtyChange given is 0",
          detail: "No change requested to Cart Item Qty.",
        });
      }
      newQty = currentQty + qtyChangeValidated;
    } else if (hasQtySet) {
      const qtySetValidated = numberRangeValidator(qtySet);
      newQty = qtySetValidated;
    }

    // ——------ handle newQty

    if (newQty < 0) {
      throw new ApiError({
        status: 400,
        source: { pointer: "cartController.js" },
        title: "Bad Request: newQty becomes a negative number",
        detail: "Cannot make Cart Item Qty to a negative number.",
      });
    } else if (newQty === 0) {
      cart.cartItems.pull({ item: itemId });
    } else if (newQty <= itemExisting.productVarAvailableQty) {
      if (itemIndexinCartItems === -1) {
        cart.cartItems.push({ item: itemId, qty: newQty });
      } else {
        cart.cartItems[itemIndexinCartItems].qty = newQty;
      }
    } else if (newQty > itemExisting.productVarAvailableQty) {
      throw new ApiError({
        status: 400,
        source: { pointer: "cartController.js" },
        title: "Bad Request: newQty too large",
        detail: `newQty cannot be larger than selected item's available Qty - ${itemExisting.productVarAvailableQty}.`,
      });
    }

    await cart.save();

    res.status(201).json({ cart });

    // // TODO: need some logic to start saving Qtys as not available if it's in someone's cart (maybe in checkout?)
  } catch (err) {
    next(err);
  }
};

const destroyCart = async (req, res, next) => {
  try {
    const user = getUserFromRequest(req);
    const cart = await Cart.findOne({ buyer: user._id }).select("buyer");

    if (!cart) {
      throw new ApiError({
        status: 403,
        source: { pointer: "cartController.js" },
        title: "Forbidden: User does not have cart",
        detail: "User needs to have cart for deletion.",
      });
    }

    // const { cartId } = req.params;
    // if (!cartId) {
    //   throw new ApiError({
    //     status: 400,
    //     source: { pointer: "cartController.js" },
    //     title: "Bad Request: No Cart ID Given",
    //     detail: "No Cart ID was passed for deletion.",
    //   });
    // }

    const deletedCart = await Cart.findByIdAndDelete(cart._id);
    res.status(200).json({ cart: deletedCart });
  } catch (err) {
    next(err);
  }
};

module.exports = { showCart, createCart, updateCart, destroyCart };
