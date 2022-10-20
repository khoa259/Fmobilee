import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { fireAuth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailLink, updatePassword } from "firebase/auth";

const RegisterComplete = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistraion"));
    console.log("window", window.location.href);
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await signInWithEmailLink(
        fireAuth,
        email,
        window.location.href
      );
      // console.log("result", result);
      if (result.user.emailVerified) {
        // remove user email from LocalStorage
        localStorage.removeItem("emailForRegistraion");
        // get user id token
        const user = fireAuth.currentUser;
        await updatePassword(user, data.password);
        const idTokenResult = await user.getIdTokenResult;
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);
        // redirect
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1>Register Complete</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input value={email} disabled />
        <input
          {...register("password", { required: true })}
          placeholder="password"
          autoFocus
        />
        {errors.password && <p>invalid email address</p>}
        <button type="submit">Complete Registration</button>
      </form>
    </div>
  );
};

export default RegisterComplete;
