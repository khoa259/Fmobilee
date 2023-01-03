import axios from "axios";

export const createBill = async (data) => {
  console.log("data", data);
  axios.post(`${process.env.REACT_APP_API}/bill`, data);
};

export const getAllBill = async () => {
  const data = await axios.get(`${process.env.REACT_APP_API}/bills`);
  return data;
};

export const getDetailBill = async (id) => {
  await axios.get(`${process.env.REACT_APP_API}/bills/${id}`);
};
