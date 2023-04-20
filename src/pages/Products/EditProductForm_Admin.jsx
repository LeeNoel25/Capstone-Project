import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProductForm(category, brand) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const product = await response.json();
      setProduct(product);
    };
    getProduct();
  }, [id]);

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setProduct({ ...product, [key]: value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/AdminProduct/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    navigate("/productpage");
  };

  const handleCancel = async () => {
    navigate("/productpage");
  };

  return (
    <>
      <div className="">
        <h1>Edit Product</h1>
        <div>
          <label className="" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className=""
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            className=""
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className="" htmlFor="category">
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
        <div className="">
          <label className="" htmlFor="brand">
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
          </select>
        </div>
        <div className="">
          <label className="" htmlFor="imgurl">
            Image URL
          </label>
          <input
            type="text"
            className="form-input"
            id="imgurl"
            name="imgurl"
            value={product.imgurl}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className="" htmlFor="description">
            Description
          </label>
          <textarea
            className=""
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            style={{ resize: "both" }} // make the textarea resizable
          />
        </div>
        <div>
          <button onClick={handleUpdate} className="">
            Save Changes
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
