import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import "../movies.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { MdEdit } from "react-icons/md";
import {
  allMovies,
  toggleFavorite,
  userFaviroteMovies,
} from "../../../redux/actions/MovieAction";

const MovieListComp = () => {
  const [favColors, setFavColors] = useState({});
  const { pathname } = useLocation();
  const token = JSON.parse(localStorage.getItem("loginUser")) || null;
  const { userId, userPermissions } = token
    ? jwtDecode(token.data)
    : { userId: [], userPermissions: [] };
  const itemsPerPage = 8;

  const dispatch = useDispatch();
  const { movies, isLoading, error, currentPage, faviroteMovies } = useSelector(
    (state) => state.movieReducer
  );

  useEffect(() => {
    if (token) {
      dispatch(userFaviroteMovies(userId, token));
    }
  }, []);

  useEffect(() => {
    setFavColors((prevFavColors) => {
      const newFavColors = { ...prevFavColors };
      faviroteMovies?.forEach((movieId) => {
        newFavColors[movieId.movieId] = "pink";
      });
      return newFavColors;
    });
  }, [faviroteMovies]);

  useEffect(() => {
    dispatch(allMovies());
  }, [pathname]);

  const totalPages = Math.ceil(movies?.data?.data?.length / itemsPerPage);

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
            movies?.data?.data &&
            movies?.data?.data
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((movie) => (
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
    </>
  );
};

export default React.memo(MovieListComp);
