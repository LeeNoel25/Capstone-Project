import * as React from "react";

export const CartContextNew = React.createContext({
  cartItemCount: [],
  cartItems: [],
  addCartItem: () => {},
  removeOneFromCart: () => {},
  removeCartItem: () => {},
  updateCartItem: () => {},
});
