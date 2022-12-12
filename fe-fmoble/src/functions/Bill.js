import axios from "axios";

export const createBill = async (cart, user) => {
  axios.post(`${process.env.REACT_APP_API}/bill`, { cart }, { user });
};
