import React from "react";
import NewMovieComp from "../../components/movies/newMovie/NewMovieComp";
import Layout from "../../components/common/layout/Layout";

const NewMovie = () => {
  return (
    <div>
      <Layout>
        <NewMovieComp />
      </Layout>
    </div>
  );
};

export default NewMovie;
