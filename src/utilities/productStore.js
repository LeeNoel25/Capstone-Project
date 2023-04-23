    import { useState, useEffect } from 'react';
    import axios from 'axios';
    
    function useProducts() {
      const [products, setProducts] = useState([]);
    
      useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        }
            fetchProducts();
      }, []);
          return products;
    }
    
    function getProductData(id, productsArray) {
      let productData = productsArray.find(product => product._id === id);
          if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
      }
     return productData;
    }
    
    export { useProducts, getProductData };
    
