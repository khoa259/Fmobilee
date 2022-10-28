//library
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
// fire base
import { auth } from "./firebase";
import { currentUser } from "./functions/auth.js";
// Components
import Login from "./pages/auth/logIn.js";
import Register from "./pages/auth/register";
import HomePage from "./pages/homePage";
import Header from "./component/header/Header";
import Footer from "./component/Footer";
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
import Category from "./pages/admin/Category";
import AdminNav from "./component/adminNav/adminNavbar";

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
      <Route>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signup/complete" component={RegisterComplete} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          {/* User route */}
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
        </Switch>
        <Footer />
      </Route>

      <Route path="/admin/:path?" exact>
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            <Switch>
              <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
              <AdminRoute exact path="/admin/category" component={Category} />
            </Switch>
          </div>
        </div>
      </Route>
    </>
  );
};

export default App;
