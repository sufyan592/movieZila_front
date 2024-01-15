import React from "react";
import NewMovieComp from "../components/newMovie/NewMovieComp";
import Nav from "../components/nav/Nav";
import MovieFooter from "../components/footer/MovieFooter";

const NewMovie = () => {
  return (
    <div>
      <Nav />
      <NewMovieComp />
      <MovieFooter />
    </div>
  );
};

export default NewMovie;
