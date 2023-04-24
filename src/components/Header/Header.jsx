import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../utilities/members-service";
import { CartContext } from "../../pages/OrderPage/CartContext";
import { CartContextNew } from "../../pages/OrderPage/CartContextNew";
import CartProduct from "../../components/Cart/CartProduct";

export default function Header({ setUser, member }) {
  const isSignedIn = !!member;
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = member || {};

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
    navigate("/login");
  };

  const handleCartButtonClick = () => {
    setShowCart(!showCart);
  };

  return (
    <nav>
      <div>
        <div id="navbarNav">
          <ul>
            {!isSignedIn && (
              <React.Fragment>
                <li>
                  <Link
                    className={location.pathname === "/login" ? "active" : ""}
                    to="/login"
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    className={location.pathname === "/signup" ? "active" : ""}
                    to="/signup"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <button onClick={handleCartButtonClick}>
                    Cart ({cardContext.cartItemCount} Items)
                  </button>
                  {showCart && (
                    <div>
                      <h2>Shopping Cart</h2>
                      {cardContext.cartItems.length > 0 ? (
                        <>
                          <p>Items in your cart:</p>
                          {cardContext.cartItems.map((item) => {
                            return (
                              <CartProduct
                                key={item.product._id}
                                item={item.product}
                                quantity={item.quantity}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <h3>The cart is empty</h3>
                      )}
                    </div>
                  )}
                </li>
              </React.Fragment>
            )}
            {!!member && (
              <li>
                <div
                  style={{
                    color: "white",
                    paddingRight: "0.5rem",
                    paddingLeft: "0.5rem",
                  }}
                >
                  Hello, <em style={{ fontStyle: "italic" }}>{member.name}</em>
                </div>
              </li>
            )}
          </ul>

          {isSignedIn && (
            <ul>
              {["member"].includes(member.role) && (
                <React.Fragment>
                  <li>{/* ... */}</li>
                  <li>
                    <button onClick={handleCartButtonClick}>
                      Cart ({cardContext.cartItems.length} Items)
                    </button>
                    {showCart && (
                      <div>
                        <h2>Shopping Cart</h2>
                        {cardContext.cartItems.length > 0 ? (
                          <>
                            <p>Items in your cart:</p>
                            {cardContext.cartItems.map((item) => {
                              return (
                                <CartProduct
                                  key={item.product._id}
                                  item={item.product}
                                  quantity={item.quantity}
                                />
                              );
                            })}
                          </>
                        ) : (
                          <h3>The cart is empty</h3>
                        )}
                      </div>
                    )}
                  </li>
                </React.Fragment>
              )}
              {["admin"].includes(member.role) && (
                <li>
                  <a
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-expanded="false"
                  >
                    Admin Tools
                  </a>
                  <ul aria-labelledby="navbarDropdownMenuLink">
                    {role === "admin" && (
                      <React.Fragment>
                        <li>
                          <a onClick={() => navigate("/productpage")}>
                            Product Portfolio
                          </a>
                        </li>
                      </React.Fragment>
                    )}
                    <li>
                      <a onClick={handleLogout}>Log Out</a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
