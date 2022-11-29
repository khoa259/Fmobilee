import axios from "axios";

export const createPaymentIntent = () => {
  axios.post(`${process.env.REACT_APP_API}/create-payment-intent`, {});
};
