import axios from "axios";

export const createBill = async (data) => {
  console.log("data", data);
  axios.post(`${process.env.REACT_APP_API}/bill`, data);
};

export const getAllBill = async () => {
  await axios.get(`${process.env.REACT_APP_API}/bills`);
};
