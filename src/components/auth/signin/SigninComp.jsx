import React, { useState, useEffect } from "react";
import "../auth.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../redux/actions/UserAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SigninComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
  });
  const { error, user, islogin } = useSelector((user) => user.userReducer);

  const userData = (e) => {
    const { name, value } = e.target;
    setUserValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitUserData = (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        email: userValue.email,
        password: userValue.password,
      })
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    } else if (user?.status === "Success") {
      toast.success(user.message);
      if (islogin == true) {
        navigate("/movies");
      }
    }
  }, [error, user, navigate]);

  return (
    <>
      <section className="movie-signup">
        <div className="movie-signup-wrapper section-spacing">
          <div className="movie-signup-content">
            <h1>Sign in</h1>
          </div>
          <div className="movie-signup-form">
            <form onSubmit={submitUserData}>
              <input
                type="email"
                placeholder="Email"
                value={userValue.email}
                name="email"
                onChange={userData}
              />
              <input
                type="password"
                placeholder="Password"
                value={userValue.password}
                name="password"
                onChange={userData}
              />
              <div className="movie-chkbox">
                <input type="checkbox" name="" id="" /> Remember me
              </div>

              <input type="submit" value="Login" className="btn-primary" />
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default SigninComp;
