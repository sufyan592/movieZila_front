import React from "react";
import Nav from "../components/nav/Nav";
import SignupComp from "../components/auth/signup/SignupComp";
import MovieFooter from "../components/footer/MovieFooter";

const Signup = () => {
  return (
    <>
      <Nav />
      <SignupComp />
      <MovieFooter />
    </>
  );
};

export default Signup;
