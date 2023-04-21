import React from "react";
import { Route, Routes } from "react-router";
import InventoryPage from "../../Inventory/InventoryPage.jsx";
import AddInventory from "../../Inventory/AddInventory.jsx";
import ProductsForm from "../../Products/ProductDashboard_Admin.jsx";
import AddProductForm from "../../Products/AddProductForm_Admin.jsx";
import EditProductForm from "../../Products/EditProductForm_Admin.jsx";

function AdminRouter() {
  return (
    <Routes>
      <Route path="/productpage" element={<ProductsForm />} />
      <Route path="/productpage/new" element={<AddProductForm />} />
      <Route
        path="/productpage/:productID/edit"
        element={<EditProductForm />}
      />
      <Route path="/adminlocation" element={<InventoryPage />} />
      <Route path="/adminlocation/edit" element={<AddInventory />} />
    </Routes>
  );
}

export default AdminRouter;
