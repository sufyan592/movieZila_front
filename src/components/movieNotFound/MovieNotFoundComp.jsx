import React from "react";
import "./movieNotFound.css";

const MovieNotFoundComp = () => {
  return (
    <>
      <section className="movie-not-found">
        <div className="movie-not-found-wrapper section-spacing">
          <h2>Your Faviroute movies list is empty</h2>
          <a href="/movies" className="btn-primary">
            Add a new movie
          </a>
        </div>
      </section>
    </>
  );
};

export default MovieNotFoundComp;
