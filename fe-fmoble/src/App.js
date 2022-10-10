import React from "react";
import { Route, Routes } from "react-router-dom";
import WebSiteLayout from "./layouts/webSiteLayout";
import HomeScreen from "./screens/homeScreen";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebSiteLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/products" element={<h1>Products Page</h1>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
