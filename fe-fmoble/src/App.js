//library
import React, { useEffect, useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { BrowserRouter, useLocation, Route, Routes } from "react-router-dom";

// fire base
import { auth } from "./firebase";
import { currentUser } from "./functions/auth.js";
// layout
import WebSiteLayout from "./layouts/webSiteLayout";
import AdminLayout from "./layouts/adminLayout";
// Components
import Login from "./pages/auth/logIn.js";
import Register from "./pages/auth/register";
import HomePage from "./pages/homePage/homePage";
import AdminRoute from "./component/routes/adminRoute";
// Router
import RegisterComplete from "./pages/auth/registerComplete";
import ForgotPassword from "./pages/auth/forgotPassword";
import History from "./pages/user/history";
import Password from "./pages/user/Password.js";
import Wishlist from "./pages/user/Wishlist.js";
import CategoryHome from "./pages/Category/CategoryHome";
import Payments from "./pages/payments/Payments";
// Router Admin
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/category/Category";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import ProductCreate from "./pages/admin/product/productCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Page404 from "./pages/404Page";
import ListProducts from "./pages/admin/product/listProducts";
import ProductDetail from "./pages/productDetail/productDetail";
import Cart from "./pages/cart/cart";
import CheckOut from "./pages/checkOut.js/checkOut";
import Shop from "./pages/shop/shop";
import Order from "./pages/admin/order/order";
import Profile from "./pages/user/Profile";
import UserLayout from "./layouts/userLayout";
import OrderDetails from "./pages/admin/order/OrderDetails";
// import Spiner from "./component/spinner/spinner";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

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
                picture: res.data.picture,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
              },
            });
            localStorage.setItem("token", idTokenResult.token);
            localStorage.setItem("images", res.data.picture);
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      {/* <Spiner /> */}
      <BrowserRouter>
        <Wrapper>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<WebSiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/complete" element={<RegisterComplete />} />
              <Route path="/forgot/password" element={<ForgotPassword />} />
              <Route path="/gio-hang" element={<Cart />} />
              <Route path="/thanh-toan" element={<CheckOut />} />
              <Route path="/:slug" element={<ProductDetail />} />
              <Route path="/category/:slug" element={<CategoryHome />} />
              <Route path="/products" element={<Shop />} />
              <Route path="/order/vnpay_return" element={<Payments />} />
              <Route path="/" element={<UserLayout />}>
                <Route path="/user/purchase/:id" element={<History />} />
                <Route path="/user/password" element={<Password />} />
                <Route path="/user/wishlist" element={<Wishlist />} />
                <Route path="/user/profile/:id" element={<Profile />} />
              </Route>
            </Route>

            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="category" element={<Category />} />
              <Route path="category/:slug" element={<CategoryUpdate />} />
              <Route path="product" element={<ProductCreate />} />
              <Route path="products" element={<ListProducts />} />
              <Route path="product/:slug" element={<ProductUpdate />} />
              <Route path="order" element={<Order />} />
              <Route path="order/:id" element={<OrderDetails />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
};

export default App;
