import React, { useState } from "react";
import "./signup.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/actions/UserAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignupComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const submitUserData = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addUser({
          name: userValue.name,
          email: userValue.email,
          password: userValue.password,
        })
      );

      toast.success("Signup successful!"); // Display success message
      setUserValue({
        name: "",
        email: "",
        password: "",
      });
      navigate("/signin");
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`); // Display error message
    }
  };

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
