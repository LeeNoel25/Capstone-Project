// import * as React from "react";
// import { CartContextNew } from "../../pages/OrderPage/CartContextNew";
// import Button from "@mui/material/Button";

// function CartProduct(props) {
//   const cartContext = React.useContext(CartContextNew);

//   return (
//     <React.Fragment>
//       <h3>{props.item.name}</h3>
//       <p>{props.quantity} total</p>
//       <p>${(props.quantity * props.item.price).toFixed(2)}</p>
//       <Button size="sm" onClick={() => cartContext.removeCartItem(props.item)}>
//         Remove Item
//       </Button>
//       <hr></hr>
//     </React.Fragment>
//   );
// }

// export default CartProduct;

import * as React from "react";
import { CartContextNew } from "../../pages/OrderPage/CartContextNew";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";

function CartProduct(props) {
  const cartContext = React.useContext(CartContextNew);

  return (
    <React.Fragment>
      <ListItemText
        primary={props.item.name}
        secondary={`${props.quantity} total, $${(
          props.quantity * props.item.price
        ).toFixed(2)}`}
        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
      />
      <ListItemSecondaryAction>
        <IconButton
          size="small"
          color="primary"
          onClick={() => cartContext.addCartItem(props.item)}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          size="small"
          color="primary"
          onClick={() => cartContext.removeOneFromCart(props.item)}
        >
          <RemoveIcon />
        </IconButton>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => cartContext.removeCartItem(props.item)}
        >
          Remove
        </Button>
      </ListItemSecondaryAction>
    </React.Fragment>
  );
}

export default CartProduct;
