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
