// import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loadStripe } from "@stripe/stripe-js";
// import "./stripe.css";
// import Spiner from "../../component/spinner/spinner";
// import { createPaymentIntent } from "../../functions/stripe";
// import axios from "axios";
// import Payment from "../../pages/payments/PayMentForm";

// const StripeCheckout = () => {
//   const history = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));
//   // console.log("user", user.token);

//   const stripe = useStripe();
//   const elements = useElements();

//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const [stripePromise, setStripePromise] = useState(null);
//   useEffect(() => {
//     // const getToken = localStorage.getItem("token");
//     getPublishableKey();
//     getClientSecret();
//     // createPaymentIntent(getToken).then((res) => {
//     //   setClientSecret(res.data.client_secret);
//     // });
//   }, []);

//   const getPublishableKey = async () => {
//     const { data } = await axios.get("http://localhost:8000/api/config");
//     setStripePromise(loadStripe(data.publishableKey));
//   };

//   const getClientSecret = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8000/api/create-payment-intents"
//       );
//       console.log(data);
//       setClientSecret(data.clientSecret);
//     } catch (error) {
//       return error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: e.target.name.value,
//         },
//       },
//     });
//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       // here you get result after successful payment
//       // create order and save in database for admin to process
//       // empty user cart from redux store and local storage
//       console.log(JSON.stringify(payload, null, 4));
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//     }
//   };
//   const handleChange = async (e) => {
//     // //
//     setDisabled(e.empty);
//     setError(e.error ? e.error.message : ""); //show error message
//   };
//   const paymentElementOptions = {
//     // layout: "tabs",
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//   };

//   return (
//     // <form id="payment-form" onSubmit={handleSubmit}>
//     //   <PaymentElement id="payment-element" options={paymentElementOptions} />
//     //   <button disabled={processing || !stripe || !elements} id="submit">
//     //     <span id="button-text">{processing ? <Spiner /> : "Pay now"}</span>
//     //   </button>
//     //   {/* Show any error or success messages */}
//     //   {/* {message && <div id="payment-message">{message}</div>} */}
//     // </form>
//     clientSecret &&
//     stripePromise && (
//       <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <p className={succeeded ? "result-message" : "result-message hidden"}>
//           Payment Successful.{" "}
//           <Link to="/user/history">See it in your purchase history.</Link>
//         </p>

//         <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
//           <CardElement
//             id="card-element"
//             options={paymentElementOptions}
//             onChange={handleChange}
//           />
//           <button
//             className="stripe-button"
//             disabled={processing || disabled || succeeded}
//           >
//             <span id="button-text">
//               {processing ? (
//                 <div className="spinner" id="spinner"></div>
//               ) : (
//                 "Pay"
//               )}
//             </span>
//           </button>
//           <br />
//           {error && (
//             <div className="card-error" role="alert">
//               {error}
//             </div>
//           )}
//         </form>
//       </Elements>
//     )
//   );
// };

// export default StripeCheckout;
