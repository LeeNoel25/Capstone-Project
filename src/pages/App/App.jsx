// src
import "../../index.css";
import React from "react";
import { Route, Routes } from "react-router";
import { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";

//OrderCart
import OrderCart from "../OrderPage/OrderCart";

//components
import Header from "../../components/Header/Header.jsx";
import WithMemberNavTools from "../../components/NavBars/WithCustomerBanner.jsx";
import WithNavBar from "../../components/NavBars/WithNavBar.jsx";

//pages.auth
import SignUpForm from "../AuthPage/SignUpForm.jsx";
import ForgetPassword from "../AuthPage/ForgetPass.jsx";
import LoginForm from "../AuthPage/LoginForm.jsx";
//pages.products
import SelectedProductPage from "../Products/SelectedProductPage_Guest.jsx";
import AddProductForm from "../Products/AddProductForm_Admin.jsx";
import EditProductForm from "../Products/EditProductForm_Admin.jsx";
import ProductsForm from "../Products/ProductDashboard_Admin.jsx";
import ProductsPage from "../Products/AllProductsPage_Guest.jsx";
//pages.msc
import { getMember } from "../../utilities/members-service.js";
import { CartContextNew } from "../OrderPage/CartContextNew";

export default function App() {
  const [user, setUser] = useState(getMember());
  const [products, setProducts] = useState([]);
  const [sortByCategory, setSortByCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  //xx
  const token = localStorage.getItem("token");
  const member = token ? JSON.parse(window.atob(token.split(".")[1])) : null;

  // Functions
  const addProduct = (product, error) => {
    if (error) {
      console.error(error);
      return;
    }
    // Add the product to the products list
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const delProduct = (id) =>
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );

  const handleEditProduct = (editedProduct) =>
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
    );

  // Effects
  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    setCategory(categories);

    const brands = [...new Set(products.map((p) => p.brand))];
    setBrand(brands);
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const addCartItem = (item) => {
    setCartItemCount(cartItemCount + 1);
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].product._id === item._id) {
        cartItems[i].quantity++;
        return;
      }
    }
    setCartItems([
      ...cartItems,
      {
        product: item,
        quantity: 1,
      },
    ]);
  };

  const removeCartItem = (item) => {
    for (let i = cartItems.length - 1; i >= 0; i--) {
      if (cartItems[i].product._id === item._id) {
        setCartItemCount(cartItemCount - cartItems[i].quantity);
        cartItems.splice(i, 1);
        setCartItems([...cartItems]);
        return;
      }
    }
  };

  const removeOneFromCart = (itemId) => {
    let found = false;
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.product._id === itemId && cartItem.quantity > 1) {
        found = true;
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    if (found) {
      setCartItems(updatedCartItems);
      setCartItemCount(cartItemCount - 1);
    }
  };

  const updateCartItem = () => {};

  const cartContextValue = {
    cartItemCount,
    cartItems,
    addCartItem,
    removeCartItem,
    updateCartItem,
    removeOneFromCart,
  };
  // Routes
  const loginRoutes = [
    {
      path: "/login",
      element: <LoginForm setUser={setUser} />,
    },
    {
      path: "/signup",
      element: <SignUpForm />,
    },
    {
      path: "/forgetpassword",
      element: <ForgetPassword />,
    },
  ];

  const addItemToCart = (item) => {};

  const guestsRoutes = [
    {
      path: "/",
      element: (
        <CartContextNew.Provider value={cartContextValue}>
          <ProductsPage
            products={products}
            category={category}
            sortByCategory={sortByCategory}
            setSortByCategory={setSortByCategory}
            onAddItemToCart={addItemToCart}
          />
        </CartContextNew.Provider>
      ),
    },
    {
      path: "/order",
      element: <OrderCart />,
    },
    {
      path: "/product/:productId",
      element: <SelectedProductPage products={products} />,
    },
  ];

  const accessDeniedComponent = (
    <div className="centered-message">Access denied</div>
  );

  const memberRoutes = [...guestsRoutes];

  const adminRouteConfig = [
    ...memberRoutes,
    {
      path: "/productpage",
      element: <ProductsForm products={products} delProduct={delProduct} />,
    },
    {
      path: "/productpage/new",
      element: (
        <AddProductForm
          products={products}
          addProduct={addProduct}
          category={category}
          brand={brand}
        />
      ),
    },
    {
      path: "/productpage/:productID/edit",
      element: (
        <EditProductForm
          products={products}
          category={category}
          brand={brand}
          handleEditProduct={handleEditProduct}
        />
      ),
    },
  ];

  const loggedInRoleSpecificRoutes = [
    {
      role: "admin",
      content: (
        <Routes>
          {memberRoutes.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={<>{config.element}</>}
            />
          ))}
          {adminRouteConfig.map((config) => {
            return (
              <Route
                key={config.path}
                path={config.path}
                element={<WithNavBar>{config.element}</WithNavBar>}
              />
            );
          })}
          <Route key="*" path="*" element={accessDeniedComponent} />
        </Routes>
      ),
    },
    {
      role: "member",
      content: (
        <Routes>
          {memberRoutes.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={<>{config.element}</>}
            />
          ))}
          <Route key="*" path="*" element={accessDeniedComponent} />
        </Routes>
      ),
    },
  ];

  const renderLoggedInContent = (member) => {
    const roleSpecificRoutes = loggedInRoleSpecificRoutes.find(
      (config) => config.role === member?.role
    );
    return roleSpecificRoutes?.content;
  };

  const renderUnauthenticatedRoutes = () => (
    <>
      <Routes>
        {loginRoutes.concat(guestsRoutes).map((config) => (
          <Route key={config.path} {...config} />
        ))}
        {adminRouteConfig.map((config) => (
          <Route
            key={config.path}
            path={config.path}
            element={accessDeniedComponent}
          />
        ))}
      </Routes>
    </>
  );

  return (
    <main className="App">
      <CartContextNew.Provider value={cartContextValue}>
        <Header setUser={setUser} member={member?.member} />
      </CartContextNew.Provider>
      {member ? (
        <React.Fragment>{renderLoggedInContent(member.member)}</React.Fragment>
      ) : (
        <React.Fragment>{renderUnauthenticatedRoutes()}</React.Fragment>
      )}
    </main>
  );
}
