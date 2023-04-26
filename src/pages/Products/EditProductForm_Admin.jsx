import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// CSS ------------------------------------------------
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function EditProductsForm({
  products,
  handleEditProduct,
  category,
  brand,
}) {
  const { productID } = useParams();
  const navigate = useNavigate();
  const CONVERTTODOLLAR = 100;
  const product = products.find((p) => p._id === productID);

  const [editedProduct, setEditedProduct] = useState(
    product
      ? {
          name: product.name,
          price: product.price / CONVERTTODOLLAR,
          category: product.category,
          brand: product.brand,
          imgurl: product.imgurl,
          description: product.description,
        }
      : {}
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    const nameExists = products.some(
      (p) => p._id !== productID && p.name === editedProduct.name
    );
    if (nameExists) {
      alert("Product with the same name already exists!");
      return;
    } else {
      const newProduct = {
        ...editedProduct,
        price: editedProduct.price * CONVERTTODOLLAR,
      };
      const response = await fetch(
        `/api/products/productpage/${productID}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(newProduct),
        }
      );
      const updatedProduct = await response.json();
      handleEditProduct(updatedProduct);
      navigate("/productpage");
    }
  };

  const handleCancel = async () => {
    navigate("/productpage");
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Edit Product
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                label="Category"
              >
                {category.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="brand">Brand</InputLabel>
              <Select
                name="brand"
                value={editedProduct.brand}
                onChange={handleChange}
                label="Brand"
              >
                {brand.map((b, i) => (
                  <MenuItem key={i} value={b}>
                    {b}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              id="imgurl"
              name="imgurl"
              value={editedProduct.imgurl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              style={{ marginLeft: "16px" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
