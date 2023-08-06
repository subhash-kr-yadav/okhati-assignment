import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { selectError, selectLoggedInUser } from '../authSlice';

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const error = useSelector(selectError);
    const user = useSelector(selectLoggedInUser);
  return (
    <>
      {user && <Navigate to={"/"} replace={true} />}
      <div className="logIn">
        <div className="logIn-title">
          <h1 className="logIn-title__content">Enter email to reset password</h1>
        </div>
        <form
          className="logIn-form"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="logIn-form__content">
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
              placeholder="email"
            />
            {errors.email && <span className="errorMessage">*{errors.email.message}</span>}
          </div>

          <button className="logIn-form__btn">Send Email</button>
          {error && <p className="errorMessage">{error.message}</p>}
        </form>
        <div className="logIn-member">
          <p className="logIn-member__link">
          Send me back to
            <Link to={"/login"} className="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword