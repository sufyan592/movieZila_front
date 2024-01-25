import React from "react";
import Nav from "../../components/common/nav/Nav";
import SignupComp from "../../components/auth/signup/SignupComp";
import MovieFooter from "../../components/common/footer/MovieFooter";

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
