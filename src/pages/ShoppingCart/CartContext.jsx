import { createContext, useState } from "react";
import { useProducts, getProductData } from "../../utilities/productStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const products = useProducts();

  function getProductQuantity(_id) {
    const quantity = cartProducts.find(
      (product) => product.id === _id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(_id) {
    const quantity = getProductQuantity(_id);
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          _id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product._id === _id 
              ? { ...product, quantity: product.quantity + 1 } 
              : product 
        )
      );
    }
  }

  function removeOneFromCart(_id) {
    const quantity = getProductQuantity(_id);

    if (quantity == 1) {
      deleteFromCart(_id);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product._id === _id 
              ? { ...product, quantity: product.quantity - 1 } 
              : product 
        )
      );
    }
  }

  function deleteFromCart(_id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct._id != _id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem._id, products); 
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
