// this page doesnt talk about authorisation

const PATHS = {
  PUBLIC: {
    HOME: "/",
    SIGN_UP: "/sign-up",
    SIGN_IN: "/sign-in",
    BUY: {
      ALL: "/buy",
      PRODUCT_ONE: (productId = `:productId`) => `/buy/${productId}`,
    },
    USER_SHOP: (userUsername = `:userUsername`) => `/${userUsername}`, // list of items user is selling
  },
  USER: (userUsername = `:userUsername`) => ({
    SHOP: `/${userUsername}`, // list of items user is selling
    ABOUT: {
      DEFAULT: `/${userUsername}/${relativeUserPaths.ABOUT.DEFAULT}`, // profile full details
      EDIT_PROFILE: `/${userUsername}/${relativeUserPaths.ABOUT.EDIT_PROFILE}`,
      EDIT_PASSWORD: `/${userUsername}/${relativeUserPaths.ABOUT.EDIT_PASSWORD}`,
    },
    BUYER: {
      CART: `/${userUsername}/${relativeUserPaths.BUYER.CART}`,
      ORDER_ALL: `/${userUsername}/${relativeUserPaths.BUYER.ORDER_ALL}`,
      ORDER_ONE: (orderId = `:orderId`) =>
        `/${userUsername}/${relativeUserPaths.BUYER.ORDER_ONE(orderId)}`,
    },
    SELLER: {
      PRODUCT_ALL: `/${userUsername}/${relativeUserPaths.SELLER.PRODUCT_ALL}`, // editable list of items user is selling
      PRODUCT_ONE: (productId = `:productId`) =>
        `/${userUsername}/${relativeUserPaths.SELLER.PRODUCT_ONE(productId)}`,
      ORDER_ALL: `/${userUsername}/${relativeUserPaths.SELLER.ORDER_ALL}`,
      ORDER_ONE: (orderId = `:orderId`) =>
        `/${userUsername}/${relativeUserPaths.SELLER.ORDER_ONE(orderId)}`,
    },
  }),
  ERROR: "*",
};

const relativeUserPaths = {
  ABOUT: {
    DEFAULT: `about`, // profile full details
    EDIT_PROFILE: `about/edit-profile`,
    EDIT_PASSWORD: `about/edit-password`,
  },
  BUYER: {
    CART: `cart`,
    ORDER_ALL: `orders`,
    ORDER_ONE: (orderId = `:orderId`) => `orders/${orderId}`,
  },
  SELLER: {
    PRODUCT_ALL: `sell`, // editable list of items user is selling
    PRODUCT_ONE: (productId = `:productId`) => `sell/${productId}`,
    ORDER_ALL: `sell/orders`,
    ORDER_ONE: (orderId = `:orderId`) => `sell/orders/${orderId}`,
  },
};

export { PATHS, relativeUserPaths };
