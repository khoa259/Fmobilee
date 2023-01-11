import axios from "axios";

export const createBill = async (data) => {
  console.log("data", data);
  const res = await axios.post(`${process.env.REACT_APP_API}/bill`, data);
  return res.status;
};

export const getAllBill = async () => {
  const data = await axios.get(`${process.env.REACT_APP_API}/bills`);
  return data;
};

export const getDetailBill = async (id) => {
  const data = await axios.get(`${process.env.REACT_APP_API}/bill/${id}`);
  return data;
};
