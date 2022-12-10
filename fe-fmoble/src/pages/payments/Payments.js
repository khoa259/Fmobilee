import React from "react";
import StripeCheckout from "../../component/stripe/stripeCheckOut";

//load stripe outside of components render to avoid
const Payments = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <div className="col-md-8 offset-md-2"></div>
    </div>
  );
};

export default Payments;
