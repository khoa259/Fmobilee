import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./stripe.css";
import Spiner from "../../component/spinner/spinner";
import { createPaymentIntent } from "../../functions/stripe";

const StripeCheckout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  // console.log("user", user.token);

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    createPaymentIntent(getToken).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.client_secret);
    });
  }, []);

  const handleSubmit = async (e) => {
    //
  };
  const handleChange = async (e) => {
    // //
    // setDisabled(e.empty);
    // setError(e.error ? e.error.message : "");
  };
  const paymentElementOptions = {
    // layout: "tabs",
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={processing || !stripe || !elements} id="submit">
        <span id="button-text">{processing ? <Spiner /> : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
};

export default StripeCheckout;
