import React from "react";
import SigninComp from "../../components/auth/signin/SigninComp";
import Nav from "../../components/common/nav/Nav";
import MovieFooter from "../../components/common/footer/MovieFooter";

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
