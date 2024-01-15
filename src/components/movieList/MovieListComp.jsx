import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import "./movielist.css";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allMovies, toggleFavorite } from "../../redux/actions/MovieAction";

const MovieListComp = () => {
  // const currentPage = useSelector((state) => state.movieReducer.currentPage);

  const [favColors, setFavColors] = useState({});
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8002/api/v1/movie/favMovies/${loginUser.user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginUser.token}`,
            },
          }
        );

        setFavColors((prevFavColors) => {
          const newFavColors = { ...prevFavColors };
          response?.data?.favourites.forEach((movieId) => {
            newFavColors[movieId.movieId] = "pink";
          });
          return newFavColors;
        });
      } catch (error) {
        console.error("Error fetching favMovies:", error.message);
      }
    };

    if (loginUser) {
      fetchData();
    }
  }, [loginUser]);

  const dispatch = useDispatch();
  const { movies, isLoading, error, currentPage } = useSelector(
    (state) => state.movieReducer
  );

  useEffect(() => {
    dispatch(allMovies());
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(allMovies(page));
  };

  const handleFavoriteClick = async (movieId) => {
    if (loginUser) {
      try {
        await dispatch(toggleFavorite(loginUser.user.id, movieId));

        setFavColors((prevFavColors) => {
          const newFavColors = { ...prevFavColors };
          if (newFavColors[movieId] === "pink") {
            newFavColors[movieId] = "#2BD17E";
          } else {
            newFavColors[movieId] = "pink";
          }
          return newFavColors;
        });
      } catch (error) {
        console.error("Error toggling favorite:", error.message);
      }
    }
  };

  return (
    <>
      <section className="movie-list-hero">
        <div className="movie-list-wrapper-hero section-spacing">
          <div className="movie-list-title">
            <h2>All Movies</h2>
          </div>
          <div className="movie-list-add">
            {loginUser ? (
              <>
                <Link to="/addmovie">
                  <CiCirclePlus />
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <section className="movies-list">
        <div className="movies-list-wrapper section-spacing">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            movies.data &&
            movies.data.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-card-img">
                  <img
                    src={`http://localhost:8002/images/${movie.img}`}
                    alt="movie"
                  />
                  {loginUser ? (
                    <div
                      className="favorite-icon"
                      onClick={() => handleFavoriteClick(movie.id)}
                    >
                      <FiHeart
                        color={
                          favColors[movie.id] === "pink" ? "white" : "#2BD17E"
                        }
                        style={{
                          backgroundColor:
                            favColors[movie.id] === "pink"
                              ? "#2BD17E"
                              : "transparent",
                          borderRadius: "50%",
                          fontSize: "32px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="movie-card-content">
                  <h5>{movie.title}</h5>
                  <p>{movie.publish_year}</p>
                  {loginUser ? (
                    <Link to={`/edit/${movie.id}`}>Edit</Link>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Pagination onPageChange={handlePageChange} currentPage={currentPage} />
    </>
  );
};

export default MovieListComp;
