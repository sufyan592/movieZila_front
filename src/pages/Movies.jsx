import React from "react";
import Nav from "../components/nav/Nav";
import MovieListComp from "../components/movieList/MovieListComp";
import MovieFooter from "../components/footer/MovieFooter";

const Movies = () => {
  return (
    <>
      <Nav />
      <MovieListComp />
      <MovieFooter />
    </>
  );
};

export default Movies;
