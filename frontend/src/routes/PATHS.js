// this page doesnt talk about authorisation

export const PATHS = {
  PUBLIC: {
    HOME: "/",
    SIGN_UP: "/sign-up",
    SIGN_IN: "/sign-in",
    BUY: { ALL: "/buy", PRODUCT_ONE: (productId) => `/buy/${productId}` },
    USER_SHOP: (userId) => `/${userId}`, // list of items user is selling
  },
  USER: (userId) => ({
    SHOP: `/${userId}`, // list of items user is selling
    ABOUT: {
      DEFAULT: `/${userId}/about`, // profile full details
      EDIT_PROFILE: `/${userId}/about/edit-profile`,
      EDIT_PASSWORD: `/${userId}/about/edit-password`,
    },
    BUYER: {
      CART: `/${userId}/cart`,
      ORDER_ALL: `/${userId}/orders`,
      ORDER_ONE: (orderId) => `/${userId}/${orderId}`,
    },
    SELLER: {
      LIST: `/${userId}/sell`, // editable list of items user is selling
      PRODUCT_ONE: (productId) => `/${userId}/sell/${productId}`,
      ORDER_ALL: `/${userId}/sell/orders`,
      ORDER_ONE: (orderId) => `/${userId}/sell/${orderId}`,
    },
  }),
  ERROR: "*",
};
