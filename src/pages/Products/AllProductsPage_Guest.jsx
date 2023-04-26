import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as API from "../../utilities/api";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { CartContextNew } from "../OrderPage/CartContextNew";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Banners from "../../components/NavBars/Banners.jsx";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function ProductsPage(props) {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const cardContext = React.useContext(CartContextNew);
  const { category, initialSortByCategory } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByCategory, setSortByCategory] = useState(initialSortByCategory);
  const [snackbarOpenCart, setSnackbarOpenCart] = useState(false);
  const [snackbarOpenFavorites, setSnackbarOpenFavorites] = useState(false);

  React.useEffect(() => {
    refreshPage();
  }, []);

  const refreshPage = () => {
    API.getProducts().then((productData) => {
      console.log(productData);
      setProducts(productData);
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const addItemToCart = (item) => {
    props?.onAddItemToCart(item);
    cardContext.addCartItem(item);
    setSnackbarOpenCart(true);
  };

  const addProductToFavorites = (item) => {
    const memberId = localStorage.getItem("memberId");
    console.log("heree", memberId);
    const token = localStorage.getItem("token");
    API.addFavorite(memberId, item._id, token)
      .then(() => {
        setSnackbarOpenFavorites(true);
      })
      .catch((error) => {
        console.error("Error adding product to favorites:", error);
      });
  };

  useEffect(() => {
    let filteredProductsCopy = [...products];
    if (sortByCategory) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (p) => p.category === sortByCategory
      );
    }
    if (sortByPrice === "lowToHigh") {
      filteredProductsCopy.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "highToLow") {
      filteredProductsCopy.sort((a, b) => b.price - a.price);
    }
    if (searchTerm) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filteredProductsCopy);
  }, [searchTerm, sortByCategory, sortByPrice, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <Banners />
      <Container>
        <Box mt={4} display="flex" justifyContent="space-between">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" size="small">
            <InputLabel>Sort by price</InputLabel>
            <Select
              label="Sort by price"
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
              sx={{ width: "200px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="lowToHigh">Low to high</MenuItem>
              <MenuItem value="highToLow">High to low</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={4}>
          {filteredProducts.map((product) => {
            return (
              <Box
                key={product._id}
                sx={{
                  display: "inline-block",
                  border: "1px solid grey",
                  height: "390px",
                  width: "180px",
                  m: "10px",
                  p: "10px",
                  textAlign: "left",
                }}
              >
                <Link to={`/product/${product._id}`} key={product._id}>
                  <Box>
                    <img
                      src={product.imgurl}
                      style={{
                        width: "180px",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box sx={{ fontSize: "14px", color: "#555555", mt: 1 }}>
                    {product.brand}
                  </Box>
                  <Box sx={{ mt: 1, height: "32px", color: "black" }}>
                    {product.name}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      mt: 2,
                      color: "black",
                    }}
                  >
                    {(product.price / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Box>
                </Link>
                <Box mt={2} justifyContent="center">
                  <Button
                    variant="outlined"
                    sx={{ width: "100%" }}
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => {
                      addItemToCart(product);
                    }}
                  >
                    Add To Cart
                  </Button>
                  <Box display="flex" justifyContent="center" mt={1}>
                  <Button
                    variant="outlined"
                    startIcon={<FavoriteIcon />}
                    onClick={() => {
                      addProductToFavorites(product);
                    }}
                  >
                    Favorite
                  </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Snackbar
          open={snackbarOpenCart}
          autoHideDuration={3000}
          onClose={(event, reason) => {
            if (reason !== "clickaway") setSnackbarOpenCart(false);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ bottom: "calc(100% - 100px)" }}
        >
          <Alert
            onClose={(event, reason) => {
              if (reason !== "clickaway") setSnackbarOpenCart(false);
            }}
            severity="success"
          >
            Item added to cart!
          </Alert>
        </Snackbar>

        <Snackbar
          open={snackbarOpenFavorites}
          autoHideDuration={3000}
          onClose={(event, reason) => {
            if (reason !== "clickaway") setSnackbarOpenFavorites(false);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ bottom: "calc(100% - 100px)" }}
        >
          <Alert
            onClose={(event, reason) => {
              if (reason !== "clickaway") setSnackbarOpenFavorites(false);
            }}
            severity="success"
          >
            Item added to favorites!
          </Alert>
        </Snackbar>
      </Container>
    </React.Fragment>
  );
}
