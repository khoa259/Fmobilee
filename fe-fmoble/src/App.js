//library
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
// fire base
import { auth } from "./firebase";
import { currentUser } from "./functions/auth.js";
// layout
import WebSiteLayout from "./layouts/webSiteLayout";
import AdminLayout from "./layouts/adminLayout";
// Components
import Login from "./pages/auth/logIn.js";
import Register from "./pages/auth/register";
import HomePage from "./pages/homePage";
import UserRoute from "./component/routes/userRoute";
import AdminRoute from "./component/routes/adminRoute";
// Router
import RegisterComplete from "./pages/auth/registerComplete";
import ForgotPassword from "./pages/auth/forgotPassword";
import History from "./pages/user/history";
import Password from "./pages/user/Password.js";
import Wishlist from "./pages/user/Wishlist.js";
// Router Admin
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/category/Category";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import ProductCreate from "./pages/admin/product/productCreate";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Page404 from "./pages/404Page";
import ListProducts from "./pages/admin/product/listProducts";

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
      {/* <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
        <AdminRoute exact path="/admin/category" component={Category} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
      </Switch> */}
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<WebSiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/complete" element={<RegisterComplete />} />
            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/user/history" element={<History />} />
            <Route path="/user/password" element={<Password />} />
            <Route path="/user/wishlist" element={<Wishlist />} />
            <Route path="/iphone" element={<h1>PageIphone</h1>} />
          </Route>
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />}>
              <Route path=":slug" element={<CategoryUpdate />} />
            </Route>
            <Route path="product" element={<ProductCreate />} />
            <Route path="products" element={<ListProducts />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      {/* <AdminRoute /> */}
    </>
  );
};

export default App;
