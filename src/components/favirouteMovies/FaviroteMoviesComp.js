import React, { useEffect, useState } from "react";
import "../movieList/movielist.css";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allMovies } from "../../redux/actions/MovieAction";
import axios from "axios";
import MovieNotFound from "../../pages/MovieNotFound";
import Nav from "../nav/Nav";
import MovieFooter from "../footer/MovieFooter";

const FaviroteMoviesComp = () => {
  const dispatch = useDispatch();
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [movies, setMovies] = useState("");
  const { currentPage } = useSelector((state) => state.movieReducer);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        `http://localhost:8002/api/v1/movie/favMovies/${loginUser.user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginUser.token}`,
          },
        }
      );
      console.log("User Data:", response.data.favourites);
      setMovies(response?.data?.favourites);
      localStorage.setItem(
        "FavMovies",
        JSON.stringify(response.data.favourites)
      );
    };
    data();
  }, [loginUser]);

  console.log(movies);

  const handlePageChange = (page) => {
    dispatch(allMovies(page));
  };

  return (
    <>
      {movies.length === 0 ? (
        <>
          <MovieNotFound />
        </>
      ) : (
        <>
          <Nav />
          <section className="movie-list-hero">
            <div className="movie-list-wrapper-hero section-spacing">
              <div className="movie-list-title">
                <h2>My Faviroute Movies</h2>
              </div>
              <div className="movie-list-add"></div>
            </div>
          </section>

          <section className="movies-list">
            <div className="movies-list-wrapper section-spacing">
              {movies &&
                movies.map((movie) => (
                  <div key={movie.Movie.id} className="movie-card">
                    <div className="movie-card-img">
                      <img
                        src={`http://localhost:8002/images/${movie.Movie.img}`}
                        alt="movie"
                      />
                    </div>
                    <div className="movie-card-content">
                      <h5>{movie.Movie.title}</h5>
                      <p>{movie.Movie.publish_year}</p>
                      {loginUser ? (
                        <Link to={`/edit/${movie.movieId}`}>Edit</Link>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
          </section>
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
          <MovieFooter />
        </>
      )}
    </>
  );
};

export default FaviroteMoviesComp;
