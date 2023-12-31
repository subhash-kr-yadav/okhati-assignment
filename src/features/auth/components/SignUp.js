import React from "react";
import "./SignUp.scss";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, selectLoggedInUser } from "../authSlice";
import { toast } from 'react-toastify';
const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  return (
    <>
      {user && toast.success("SuccessFully Register and WelCome to Home Page") && <Navigate to={"/login"} replace={true} />}
      <div className="signUp">
        <div className="signUp-title">
          <h1 className="signUp-title__content">Create a New Account</h1>
        </div>
        <form
          className="signUp-form"
          autocomplete="off"
          onSubmit={handleSubmit((data) => {
            const user = { email: data.email, password: data.password };
            dispatch(createUserAsync(user));
          })}
        >
          <div className="signUp-form__content">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              {...register("email", {
                required: "email required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid",
                },
              })}
              id="email"
              placeholder="enter your email address"
            />
            {errors.email && (
              <span className="errorMessage">*{errors.email.message}</span>
            )}
          </div>
          <div className="signUp-form__content">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "password required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `-at least 8 characters
                  -must contain at least 1 uppercase letter and 1 number
                  -can contain special character`,
                },
              })}
              id="password"
              placeholder="enter your password"
            />
            {errors.password && (
              <span className="errorMessage">*{errors.password.message}</span>
            )}
          </div>
          <div className="signUp-form__content">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "password not matching",
              })}
              id="confirmPassword"
              placeholder="confirm your password"
            />
            {errors.confirmPassword && (
              <span className="errorMessage">
                *{errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button className="signUp-form__btn" >Sign Up</button>
        </form>
        <div className="signUp-member">
          <p className="signUp-member__link">
            Already a Member ?{" "}
            <Link to={"/login"} className="link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
