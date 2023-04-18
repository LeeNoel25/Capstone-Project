// src
// import "../index.css";
import React from "react";
import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/umd/popper.min.js";
//components
import Header from "../components/Header/Header";
import WithMemberNavTools from "../components/NavBars/WithCustomerBanner";
import WithNavBar from "../components/WithNavBar";
//pages.admin
import Admin from "../Admin/Admin";
import Groomer from "../Admin/Groomer";
import NewGroomer from "../Admin/CreateGroomer";
import Edit from "../Admin/EditGroomer";
//pages.auth
import SignUpForm from "../AuthPage/SignUpForm";
import ForgetPassword from "../AuthPage/ForgetPass";
import LoginForm from "../AuthPage/LoginForm";
//pages.bookings-tbc
import BookingPage from "../Bookings/BookingPage";
import UpcomingBooking from "../Bookings/BookingPlanner";
//pages.inventory-tbc
import InventoryPage from "../Inventory/InventoryPage";
import AddInventory from "../Inventory/AddInventory";
//pages.map
import Map from "../Map/Map";
//pages.products
import SelectedProductPage from "../Products/SelectedProductPage";
import AddProductForm from "../Products/AddProductForm_Admin";
import EditProductForm from "../Products/EditProductForm_Admin";
import ProductsForm from "../Products/ProductDashboard_Admin";
import ProductsPage from "../Products/AllProductsPage_Guest";
//pages.msc
import { getMember } from "../utilities/members-service";

export default function App() {
  const [member, setMember] = useState(getMember());
  const [products, setProducts] = useState([]);
  const [sortByCategory, setSortByCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

const token = localStorage.getItem("token");
if (token) {
  const parsedMember = JSON.parse(window.atob(token.split(".")[1]));
  setMember(parsedMember);
}

  const addProduct = (product, error) => {
    if (error) {
      console.error(error);
      return;
    }
    // Add the product to the products list
    setProducts(products.concat(product));
  };
  const delProduct = (id) =>
    setProducts(products.filter(({ _id }) => _id !== id));

  const handleEditProduct = (editedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
    );
  };

  useEffect(() => {
    const categories = [...new Set(products.map((p) => p.category))];
    setCategory(categories);

    const brands = [...new Set(products.map((p) => p.brand))];
    setBrand(brands);
  }, [products]);

  useEffect(() => {
    fetch("/api/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

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

  const productsPageRoutes = [
    {
      path: "/",
      element: (
        <ProductsPage
          products={products}
          category={category}
          sortByCategory={sortByCategory}
          setSortByCategory={setSortByCategory}
        />
      ),
    },
    {
      path: "/products/:productName",
      element: <SelectedProductPage products={products} />,
    },
  ];

  const accessDeniedComponent = (
    <div className="centered-message">Access denied</div>
  );

  const memberPagesRoutes = [
    ...productsPageRoutes,
    {
      path: "/map",
      element: <Map />,
    },
    {
      path: "/booking",
      element: <BookingPage />,
    },
    {
      path: "/history",
      element: <UpcomingBooking />,
    },
  ];

  const groomerRouteConfig = [
    {
      path: "/admin/*",
      element: <Admin />,
    },
    {
      path: "/groomer/:id/*",
      element: <Groomer />,
    },
    {
      path: "/groomer/edit/:id",
      element: <Edit />,
    },
    {
      path: "/newGroomer",
      element: <NewGroomer />,
    },
  ];

  const adminRouteConfig = [
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
      path: "/productpage/products/:productID/edit",
      element: (
        <EditProductForm
          products={products}
          category={category}
          brand={brand}
          handleEditProduct={handleEditProduct}
        />
      ),
    },
    {
      path: "/adminlocation",
      element: <InventoryPage />,
    },
    {
      path: "/adminlocation/edit",
      element: <AddInventory />,
    },
  ];

  const loggedInRoleSpecificRoutes = [
    {
      role: "groomer",
      content: (
        <Routes>
          {memberPagesRoutes.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={
                <WithMemberNavTools>{config.element}</WithMemberNavTools>
              }
            />
          ))}
          {groomerRouteConfig.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={<WithNavBar>{config.element}</WithNavBar>}
            />
          ))}
          <Route key="*" path="*" element={accessDeniedComponent} />
        </Routes>
      ),
    },
    {
      role: "admin",
      content: (
        <Routes>
          {memberPagesRoutes.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={
                <WithMemberNavTools>{config.element}</WithMemberNavTools>
              }
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
          {memberPagesRoutes.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={
                <WithMemberNavTools>{config.element}</WithMemberNavTools>
              }
            />
          ))}
          <Route key="*" path="*" element={accessDeniedComponent} />
        </Routes>
      ),
    },
  ];

  const renderAuthenticatedPages = (member) => {
    const renderLoggedInContent = loggedInRoleSpecificRoutes.find(
      (config) => config.role === member.role
    )?.content;

    return <React.Fragment>{renderLoggedInContent}</React.Fragment>;
  };

  const renderUnauthenticatedPages = () => (
    <React.Fragment>
      <WithMemberNavTools>
        <Routes>
        {loginRoutes.map((config) => (
          <Route key={config.path} {...config} />
          ))}
          <Route path="/maps" element={<Map />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/groomer/:id/*" element={<Groomer />} />
          {productsPageRoutes.map((config) => (
            <Route key={config.path} {...config}></Route>
          ))}
          {memberPagesRoutes.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={
                <div className="centered-message">
                  <Link to="/login">Please login</Link>
                </div>
              }
            />
          ))}
          {groomerRouteConfig.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={accessDeniedComponent}
            />
          ))}
          {adminRouteConfig.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={accessDeniedComponent}
            />
          ))}
        </Routes>
      </WithMemberNavTools>
    </React.Fragment>
  );
  console.log("member ", member?.member);

  return (
    <main className="App">
      <Header setUser={setUser} member={member ? member.member : null}/>
      {member ? renderAuthenticatedPages(member.member) : renderUnauthenticatedPages()}
    </main>
  );
}
