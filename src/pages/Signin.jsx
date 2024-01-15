import React from "react";
import SigninComp from "../components/auth/signin/SigninComp";
import Nav from "../components/nav/Nav";
import MovieFooter from "../components/footer/MovieFooter";

const Signin = () => {
  return (
    <>
      <Nav />
      <SigninComp />
      <MovieFooter />
    </>
  );
};

export default Signin;
