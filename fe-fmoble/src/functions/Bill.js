import axios from "axios";

export const createBill = async (cart, user, data) => {
  axios.post(`${process.env.REACT_APP_API}/bill`, data);
};
