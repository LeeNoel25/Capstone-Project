import axios from "axios";

const SERVER_ROOT = "/api";

export function login(email, password) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER_ROOT}/login`)
      .then((response) => {})
      .catch((error) => {
        reject(error);
      });
  });
}

export function getProducts() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${SERVER_ROOT}/products`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const getFavorites = async (memberId, token) => {
  try {
    const res = await axios.get(`${SERVER_ROOT}/favorites/${memberId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Error fetching favorites");
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

/**
 * API to user submit cart items for validation
 * @param {String} token User JWT tokens
 * @param {Array<>} items Cart Items
 * @return {Promise}
 */
export function submitCart(token, items) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${SERVER_ROOT}/submitCart`,
        {
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        reject(error);
      });
  });
}
