import * as React from "react";
import { CartContextNew } from "../../pages/OrderPage/CartContextNew";
// CSS ----------------------------------------------------------------
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
          (props.quantity * props.item.price) /
          100
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
