import React from "react";
import Nav from "../components/nav/Nav";
import EditMovieComp from "../components/editMovie/EditMovieComp";
import MovieFooter from "../components/footer/MovieFooter";

const EditMovie = () => {
  return (
    <div>
      <Nav />
      <EditMovieComp />
      <MovieFooter />
    </div>
  );
};

export default EditMovie;
