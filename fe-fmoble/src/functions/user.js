import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
export const getUserCart = async (authtoken) =>
  await axios.get(`http://localhost:8000/api/user/cart`, {
    headers: {
      authtoken: authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
export const saveUserAddress = async (authtoken, address) => {
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const updateQty = async (idCart, data) => {
  await axios.put(`${process.env.REACT_APP_API}/user/cart/${idCart}`, data);
};

// export const ordersByUser = async (authtoken) => {
//   const data = await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
//     headers: {
//       authtoken,
//     },
//   });
//   return data;
// };

export const getUserOrders = async (authtoken, orderdBy) => {
  const data = await axios.get(
    `${process.env.REACT_APP_API}/user/orders/${orderdBy}`,
    {
      headers: {
        authtoken,
      },
    }
  );
  return data;
};

export const getWishlist = async (authtoken) => {
  const data = await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });
  return data;
};

export const removeWishlist = async (productId, authtoken) => {
  const data = await axios.delete(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
  return data;
};

export const addToWishList = async (productId, authtoken) => {
  const data = await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
