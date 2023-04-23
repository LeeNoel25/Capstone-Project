import Header from "../../components/Header/Header";
import AllProductsPage from "../Products/AllProductsPage_Guest";
import CartProvider from "./CartContext";

function OrderCart() {
  const path = window.location.pathname;
  let content = null;

  switch (path) {
    case "/order":
      content = <AllProductsPage />;
      break;
    default:
      content = <AllProductsPage />;
      break;
  }

  return (
    <CartProvider>
      <Header />
      {content}
    </CartProvider>
  );
}

export default OrderCart;
