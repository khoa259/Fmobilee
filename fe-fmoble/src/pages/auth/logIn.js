import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import Spiner from "../../component/spinner/spinner";

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("khoa10688@gmail.com");
  const [password, setPassword] = useState("1234567");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history("/");
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history("/admin/dashboard");
    } else {
      history("/");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              picture: res.data.picture,
              role: res.data.role,
              address: res.data?.address,
              // image: res.data?.avatar,
              _id: res.data._id,
              token: idTokenResult.token,
            },
          });
          roleBasedRedirect(res);
          localStorage.setItem("token", idTokenResult.token);
        })
        .catch((err) => console.log("failed", err));
      history("/");
    } catch (error) {
      toast.error("lỗi đăng nhập");
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>
      <Link to="/forgot/password">Quên Mật Khẩu</Link>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        size="large"
        disabled={!email || password.length < 6}>
        Đăng Nhập
      </Button>
    </form>
  );

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
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
            roleBasedRedirect(res);
          })
          .catch();
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <Spiner /> : <h4>Đăng Nhập</h4>}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            size="large">
            Đăng Nhập Google
          </Button>
          <Link to="/register">
            <Button
              className="mb-3"
              block
              shape="round"
              size="large"
              type="primary"
              ghost>
              Đăng Ký Tài Khoản
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
