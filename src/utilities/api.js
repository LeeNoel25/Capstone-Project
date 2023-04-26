import axios from "axios";

export function login(email, password) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${SERVER_ROOT}/login`, { email, password })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getFavorites(memberId, token) {
  try {
    const response = await fetch(`/api/member/favorites/${memberId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Network error");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export const addFavorite = async (memberId, productId, token) => {
  try {
    const res = await axios.post(
      `/api/member/favorites/${memberId}/${productId}`,
      { productId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error adding product to favorites");
  }
};

export const removeFavorite = async (memberId, productId, token) => {
  try {
    const res = await axios.delete(
      `/api/member/favorites/${memberId}/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error removing product from favorites");
  }
};

export function getProducts() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/products`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

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
        `/api/submitCart`,
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
