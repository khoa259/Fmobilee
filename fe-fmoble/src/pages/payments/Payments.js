import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "../../component/stripe/stripeCheckOut";

//load stripe outside of components render to avoid
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Payments = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">{/* <StripeCheckout /> */}</div>
      </Elements>
    </div>
  );
};

export default Payments;
