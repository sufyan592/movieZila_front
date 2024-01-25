import React from "react";
import Nav from "../nav/Nav";
import MovieFooter from "../footer/MovieFooter";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <MovieFooter />
    </>
  );
};

export default Layout;
