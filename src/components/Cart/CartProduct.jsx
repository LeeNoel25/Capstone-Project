import * as React from "react";
import { CartContextNew } from "../../pages/OrderPage/CartContextNew";
import Button from "@mui/material/Button";

function CartProduct(props) {
  const cartContext = React.useContext(CartContextNew);

  return (
    <React.Fragment>
      <h3>{props.item.name}</h3>
      <p>{props.quantity} total</p>
      <p>${(props.quantity * props.item.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cartContext.removeCartItem(props.item)}>
        Remove!!
      </Button>
      <hr></hr>
    </React.Fragment>
  );
}

export default CartProduct;
