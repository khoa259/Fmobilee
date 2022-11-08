import axios from "axios";

export const createProduct = async (product, authtoken) => {
  await axios.post(`http://localhost:8000/api/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
