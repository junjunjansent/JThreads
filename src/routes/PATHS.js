export const PATHS = {
  PUBLIC: {
    HOME: "/",
    BUY_ALL: "/buy",
    REGISTER: "/register",
    LOGIN: "/login",
  },
  USER: (userId) => ({
    ABOUT: `/${userId}/about`,
    BUYER_ID: {
      BUY_ALL: `/${userId}/buy`,
      BUY_ONE: (productId) => `/${userId}/buy/${productId}`,
      CART: `not yet defined`,
      ORDER_ALL: `/${userId}/buy/orders`,
      ORDER_ONE: (orderId) => `/${userId}/buy/${orderId}`,
    },
    SELLER: {
      SELL_ALL: `/${userId}/sell`,
      SELL_ONE: (productId) => `/${userId}/sell/${productId}`,
      CART: `not yet defined`,
      ORDER_ALL: `/${userId}/sell/orders`,
      ORDER_ONE: (orderId) => `/${userId}/sell/${orderId}`,
    },
  }),
  ERROR: "*",
};
