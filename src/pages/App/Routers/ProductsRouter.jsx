import React from "react";
import { Route, Routes } from "react-router";
import ProductsPage from "../../Products/AllProductsPage_Guest.jsx";
import SelectedProductPage from "../../Products/SelectedProductPage_Guest.jsx";

function ProductsRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/:productName" element={<SelectedProductPage />} />
    </Routes>
  );
}

export default ProductsRouter;
