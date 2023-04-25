import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../utilities/members-service";
import { CartContext } from "../../pages/OrderPage/CartContext";
import { CartContextNew } from "../../pages/OrderPage/CartContextNew";
import CartProduct from "../../components/Cart/CartProduct";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export default function Header({ setUser, member }) {
  const isSignedIn = !!member;
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = member || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const cart = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const cardContext = useContext(CartContextNew);
  const productsCount = cardContext.cartItems.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    logout();
    navigate("/");
  };

  const handleCartButtonClick = (event) => {
    setShowCart(!showCart);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setShowCart(false);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        {!!member && (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, <em style={{ fontStyle: "italic" }}>{member.name}</em>
          </Typography>
        )}
        {!isSignedIn && (
          <React.Fragment>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              className={location.pathname === "/login" ? "active" : ""}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={location.pathname === "/signup" ? "active" : ""}
            >
              Register
            </Button>
          </React.Fragment>
        )}
        {isSignedIn && (
          <React.Fragment>
            <IconButton
              color="inherit"
              aria-label="cart"
              onClick={handleCartButtonClick}
            >
              <Badge badgeContent={productsCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Popover
              anchorEl={anchorEl}
              open={showCart}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box sx={{ width: "60ch" }}>
                {cardContext.cartItems.length > 0 ? (
                  cardContext.cartItems.map((item, index) => (
                    <React.Fragment key={item.product._id}>
                      <MenuItem disableRipple>
                        <div onClick={(e) => e.stopPropagation()}>
                          <CartProduct
                            item={item.product}
                            quantity={item.quantity}
                          />
                        </div>
                      </MenuItem>
                      {index !== cardContext.cartItems.length - 1 && (
                        <Divider />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <MenuItem onClick={handleClose}>
                    <h3>The cart is empty</h3>
                  </MenuItem>
                )}
              </Box>
            </Popover>
            <Button color="inherit" onClick={handleLogout}>
              Log Out
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
