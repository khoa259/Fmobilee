import axios from "axios";

export const createBill = async (data) => {
  console.log("data", data);
  axios.post(`${process.env.REACT_APP_API}/bill`, data);
};

export const getAllBill = async () => {
  const data = await axios.get("http://localhost:8000/api/bills");
  return data;
};
