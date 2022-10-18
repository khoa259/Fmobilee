import React from "react";
import { Route, Routes } from "react-router-dom";
import WebSiteLayout from "./layouts/webSiteLayout";
import Login from "./pages/auth/logIn";
import Register from "./pages/auth/register";
import HomePage from "./pages/homePage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebSiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
