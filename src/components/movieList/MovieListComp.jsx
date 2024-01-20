import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import "./movielist.css";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allMovies, toggleFavorite } from "../../redux/actions/MovieAction";
import { jwtDecode } from "jwt-decode";
import { MdEdit } from "react-icons/md";

const MovieListComp = () => {
  const [favColors, setFavColors] = useState({});
  const token = JSON.parse(localStorage.getItem("loginUser")) || null;
  const { userId, userPermissions } = token
    ? jwtDecode(token.data)
    : { userId: [], userPermissions: [] };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8002/api/v1/movie/favMovies/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.data}`,
            },
          }
        );

        setFavColors((prevFavColors) => {
          const newFavColors = { ...prevFavColors };
          response?.data?.data.forEach((movieId) => {
            newFavColors[movieId.movieId] = "pink";
          });
          return newFavColors;
        });
      } catch (error) {
        console.error("Error fetching favMovies:", error.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

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
    if (token) {
      try {
        dispatch(toggleFavorite(userId, movieId, token.data));

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
            {userPermissions.some((permission) => permission === "create") ? (
              <Link to="/addmovie">
                <CiCirclePlus />
              </Link>
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
                  {token ? (
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
                  <div className="movie-card-inner-content">
                    <p>{movie.publish_year}</p>
                    {userPermissions.some(
                      (permission) => permission === "edit"
                    ) ? (
                      <Link to={`/edit/${movie.id}`}>
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

      <Pagination onPageChange={handlePageChange} currentPage={currentPage} />
    </>
  );
};

export default MovieListComp;
