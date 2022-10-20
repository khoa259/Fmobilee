import React from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { fireAuth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };
    // gửi email đến tài khoản đăng ký
    await sendSignInLinkToEmail(fireAuth, data.email, config);
    toast.success(
      `Email is send to ${data.email}. Click the link to complete your registration`
    );
    window.localStorage.setItem("emailForRegistraion", data.email);
    reset();
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        {errors.email && <p>invalid email address</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
