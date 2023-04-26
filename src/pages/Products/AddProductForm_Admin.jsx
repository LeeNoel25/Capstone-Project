import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// CSS -----------------------------------------
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

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
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center">
          Add Product
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
            />
          </Grid>
          {product.brand === "Other" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Brand"
                name="newBrand"
                value={newBrand}
                onChange={handleNewBrandChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Picture URL"
              name="imgurl"
              value={product.imgurl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
