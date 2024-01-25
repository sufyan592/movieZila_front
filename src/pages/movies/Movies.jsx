import React from "react";
import Nav from "../../components/common/nav/Nav";
import MovieFooter from "../../components/common/footer/MovieFooter";
import Layout from "../../components/common/layout/Layout";
import MovieListComp from "../../components/movies/movieList/MovieListComp";

const Movies = () => {
  return (
    <>
      <Layout>
        <MovieListComp />
      </Layout>
    </>
  );
};

export default Movies;
