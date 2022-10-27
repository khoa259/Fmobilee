import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import HomePage from "./pages/homePage";
import Header from "./component/Header";
import Footer from "./component/Footer";
import RegisterComplete from "./pages/auth/registerComplete";
import ForgotPassword from "./pages/auth/forgotPassword";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth.js";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signup/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
