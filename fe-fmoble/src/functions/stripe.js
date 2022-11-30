import axios from "axios";

export const createPaymentIntent = (authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intents`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
