import React, { useState, useEffect } from "react";
// import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/actions/UserAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../auth.css";

const SignupComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users } = useSelector((user) => user.userReducer);
  const [userValue, setUserValue] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      addUser(
        {
          name: userValue.name,
          email: userValue.email,
          password: userValue.password,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    } else if (users.status === "Success") {
      toast.success(users.message);
      navigate("/signin");
    }
  }, [error, users]);

  return (
    <>
      <section className="movie-signup">
        <div className="movie-signup-wrapper section-spacing">
          <div className="movie-signup-content">
            <h1>Sign up</h1>
          </div>
          <div className="movie-signup-form">
            <form onSubmit={submitUserData}>
              <input
                type="text"
                placeholder="Full Name"
                value={userValue.name}
                name="name"
                onChange={userData}
              />
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

              <input type="submit" value="Signup" className="btn-primary" />
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default SignupComp;
