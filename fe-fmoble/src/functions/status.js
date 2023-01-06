import axios from "axios";

export const getListStatus = async () => {
  await axios.get(`${process.env.REACT_APP_API}/status`);
};
