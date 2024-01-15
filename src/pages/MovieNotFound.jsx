import React from "react";
import Nav from "../components/nav/Nav";
import MovieNotFoundComp from "../components/movieNotFound/MovieNotFoundComp";
import MovieFooter from "../components/footer/MovieFooter";

const MovieNotFound = () => {
  return (
    <>
      <Nav />
      <MovieNotFoundComp />
      <MovieFooter />
    </>
  );
};

export default MovieNotFound;
