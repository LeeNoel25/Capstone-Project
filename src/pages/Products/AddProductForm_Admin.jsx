import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    brand: "",
    imgurl: "",
    description: "",
    newBrands: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

  const createProduct = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ["bearer", token],
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        navigate("/products");
      } else {
        console.log("unable to create");
      }
    };

    createProduct();
  };

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleCancel = async () => {
    navigate("/productpage");
  };

  return (
    <>
      <div className="">
        <h1>Add Product</h1>
        <div>
          <label className="">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className=""
          />
        </div>
        <div>
          <label htmlFor="price" className="">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className=""
          />
        </div>
        <div>
          <label htmlFor="category" className="">
            Category
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className=""
          >
            {category.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <select
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className=""
          >
            {brand.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          {product.brand === "Other" && (
            <div>
              <input
                type="text"
                name="newBrand"
                value={newBrand}
                placeholder="Enter a new brand"
                onChange={handleChange}
                className=""
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="imgurl" className="">
            Picture URL
          </label>
          <input
            type="text"
            name="imgurl"
            value={product.imgurl}
            onChange={handleChange}
            className=""
          />
        </div>
        <div>
          <label htmlFor="description" className="">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className=""
          ></textarea>
        </div>
        <div>
          <button className="">
            Submit
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className=""
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
