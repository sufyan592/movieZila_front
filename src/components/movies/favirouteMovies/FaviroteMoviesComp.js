import React, { useEffect, useState } from "react";
// import "../movieList/movielist.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allMovies,
  userFaviroteMovies,
} from "../../../redux/actions/MovieAction";
import MovieNotFound from "../../../pages/movies/MovieNotFound";
import Nav from "../../common/nav/Nav";
import MovieFooter from "../../common/footer/MovieFooter";
import { MdEdit } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import "../movies.css";

const FaviroteMoviesComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("loginUser")) || null;
  const { userId, userPermissions } = token
    ? jwtDecode(token.data)
    : navigate("/signin");
  const {
    currentPage,
    isLoading,
    error,
    faviroteMovies: movies,
  } = useSelector((state) => state.movieReducer);

  console.log("IS LOADING:", isLoading);
  const itemsPerPage = 8;

  useEffect(() => {
    if (token) {
      dispatch(userFaviroteMovies(userId, token));
    }
  }, []);

  const totalPages = Math.ceil(movies?.length / itemsPerPage);

  const handlePageChange = (page) => {
    dispatch(allMovies(page));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  console.log(movies);

  return (
    <>
      {!movies?.length ? (
        <>
          <MovieNotFound />
        </>
      ) : (
        <>
          <Nav />
          <section className="movie-list-hero">
            <div className="movie-list-wrapper-hero section-spacing">
              <div className="movie-list-title">
                <h2>My Favourite Movies</h2>
              </div>
              <div className="movie-list-add"></div>
            </div>
          </section>

          <section className="movies-list">
            <div className="movies-list-wrapper section-spacing">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                movies &&
                movies.map((movie) => (
                  <div key={movie?.Movie?.movieId} className="movie-card">
                    <div className="movie-card-img">
                      <img
                        src={`http://localhost:8002/images/${movie?.Movie?.img}`}
                        alt="movie"
                      />
                    </div>
                    <div className="movie-card-content">
                      <h5>{movie?.Movie?.title}</h5>
                      <div className="movie-card-inner-content">
                        <p>{movie?.Movie?.publish_year}</p>
                        {userPermissions.some(
                          (permission) => permission === "edit"
                        ) ? (
                          <Link to={`/edit/${movie?.movieId}`}>
                            <MdEdit />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="pagination">
            <button onClick={handlePrevious} className="prev-btn">
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNext} className="next-btn">
              Next
            </button>
          </div>

          <MovieFooter />
        </>
      )}
    </>
  );
};

export default FaviroteMoviesComp;
