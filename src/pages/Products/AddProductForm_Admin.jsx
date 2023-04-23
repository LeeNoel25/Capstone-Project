import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProductsForm({
  addProduct,
  category,
  brand,
  products,
}) {
  const navigate = useNavigate();
  const defaultCategory = category[0];
  const defaultBrand = brand[0];
  const CONVERTTODOLLAR = 100;
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: defaultCategory,
    brand: defaultBrand,
    imgurl: "",
    description: "",
    newBrands: "",
  });

  const [newBrand, setNewBrand] = useState("");

  const handleChange = (event) => {
    const key = event.target.name;
    let value = event.target.value;

    if (key === "price") {
      if (value === "") {
        value = "";
      } else {
        value = parseInt(value);
        if (isNaN(value)) {
          alert("Please enter a valid number for price.");
          return;
        }
      }
    }

    setProduct({ ...product, [key]: value });
  };

  const handleNewBrandChange = (event) => {
    const value = event.target.value;
    setNewBrand(value);
  };

  const handleAddProduct = async (newProduct) => {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/products/AdminProduct/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });
    const newProducts = await response.json();
    addProduct(newProducts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameExists = products.some(
      (p) => p.name.toLowerCase() === product.name.toLowerCase()
    );

    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.brand ||
      !product.imgurl ||
      !product.description
    ) {
      alert("Please fill in all required fields.");
      return;
    } else if (nameExists) {
      alert("Product name already exists.");
      return;
    } else {
      const newProduct = {
        ...product,
        price: product.price * CONVERTTODOLLAR,
        newBrands: newBrand,
      };
      handleAddProduct(newProduct);
      navigate("/productpage");
    }
  };

  const handleCancel = async () => {
    navigate("/productpage");
  };
  return (
    <>
      <div className="">
        <h1>Add Product</h1>
        <div>
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          {product.brand === "Other" && (
            <div>
              <input
                type="text"
                name="newBrand"
                value={newBrand}
                placeholder="Enter a new brand"
                onChange={handleNewBrandChange}
                className="form-input"
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="imgurl" className="form-label">
            Picture URL
          </label>
          <input
            type="text"
            name="imgurl"
            value={product.imgurl}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-input"
          ></textarea>
        </div>
        <div>
          <button onClick={handleSubmit} className="">
            Submit
          </button>
          <button onClick={handleCancel} type="button" className="">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
