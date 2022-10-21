import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import HomePage from "./pages/homePage";
import Header from "./component/Header";
import Footer from "./component/Footer";
import RegisterComplete from "./pages/auth/registerComplete";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
