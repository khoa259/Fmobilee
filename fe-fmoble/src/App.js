import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import WebSiteLayout from "./layouts/webSiteLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import HomePage from "./pages/homePage";
import RegisterComplete from "./pages/auth/registerComplete";
// import { ToastContainer } from "react-toastify";
import { fireAuth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log(user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<WebSiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
