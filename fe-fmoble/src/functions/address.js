import axios from "axios";
export const getAddress = async () => {
  await axios.get("https://provinces.open-api.vn/api/");
};
