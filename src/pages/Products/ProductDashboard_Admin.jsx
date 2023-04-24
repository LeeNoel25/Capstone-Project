import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteProductBtn from "./DeleteProductBtn_Admin";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

export default function ProductsForm({ products, delProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    let filteredProductsCopy = [...products];

    if (searchTerm) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p._id.toLowerCase().trim().includes(searchTerm.toLowerCase())
      );
    }
    setSortedProducts(filteredProductsCopy);
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center">
          Product Portfolio
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            placeholder="Enter Product name, id, category or brand"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/productpage/new"
            >
              Add New Product
            </Button>
          </Box>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Id</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Product Brand</TableCell>
              <TableCell>Picture URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p._id}</TableCell>
                <TableCell>${(p.price / 100).toFixed(2)}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.imgurl}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/productpage/${p._id}/edit`}
                  >
                    Edit
                  </Button>
                  <DeleteProductBtn id={p._id} delProduct={delProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
