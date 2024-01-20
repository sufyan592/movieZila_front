// import React, { useEffect, useState } from "react";
// import "../movieList/movielist.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { allMovies } from "../../redux/actions/MovieAction";
// import axios from "axios";
// import MovieNotFound from "../../pages/MovieNotFound";
// import Nav from "../nav/Nav";
// import MovieFooter from "../footer/MovieFooter";
// import { MdEdit } from "react-icons/md";
// import { jwtDecode } from "jwt-decode";

// const FaviroteMoviesComp = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = JSON.parse(localStorage.getItem("loginUser")) || null;
//   const { userId, userPermissions } = token
//     ? jwtDecode(token.data)
//     : navigate("/signin");
//   const [movies, setMovies] = useState("");
//   const { currentPage } = useSelector((state) => state.movieReducer);

//   useEffect(() => {
//     const data = async () => {
//       const response = await axios.get(
//         `http://localhost:8002/api/v1/movie/favMovies/${userId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token.data}`,
//           },
//         }
//       );
//       console.log("Res::", response.data.data);
//       setMovies(response?.data?.data);
//     };
//     data();
//   }, []);

//   const handlePageChange = (page) => {
//     dispatch(allMovies(page));
//   };

//   return (
//     <>
//       {!movies.length ? (
//         <>
//           <MovieNotFound />
//         </>
//       ) : (
//         <>
//           <Nav />
//           <section className="movie-list-hero">
//             <div className="movie-list-wrapper-hero section-spacing">
//               <div className="movie-list-title">
//                 <h2>My Faviroute Movies</h2>
//               </div>
//               <div className="movie-list-add"></div>
//             </div>
//           </section>

//           <section className="movies-list">
//             <div className="movies-list-wrapper section-spacing">
//               {movies &&
//                 movies.map((movie) => (
//                   <div key={movie.Movie.id} className="movie-card">
//                     <div className="movie-card-img">
//                       <img
//                         src={`http://localhost:8002/images/${movie.Movie.img}`}
//                         alt="movie"
//                       />
//                     </div>
//                     <div className="movie-card-content">
//                       <h5>{movie.Movie.title}</h5>
//                       <div className="movie-card-inner-content">
//                         <p>{movie.Movie.publish_year}</p>
//                         {userPermissions.some(
//                           (permission) => permission === "edit"
//                         ) ? (
//                           <Link to={`/edit/${movie.movieId}`}>
//                             <MdEdit />
//                           </Link>
//                         ) : null}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </section>

//           <MovieFooter />
//         </>
//       )}
//     </>
//   );
// };

// export default FaviroteMoviesComp;

import React, { useEffect, useState } from "react";
import "../movieList/movielist.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allMovies } from "../../redux/actions/MovieAction";
import axios from "axios";
import MovieNotFound from "../../pages/MovieNotFound";
import Nav from "../nav/Nav";
import MovieFooter from "../footer/MovieFooter";
import { MdEdit } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const FaviroteMoviesComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("loginUser")) || null;
  const { userId, userPermissions } = token
    ? jwtDecode(token.data)
    : navigate("/signin");
  const [movies, setMovies] = useState("");
  const { currentPage } = useSelector((state) => state.movieReducer);
  const itemsPerPage = 8;

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(
        `http://localhost:8002/api/v1/movie/favMovies/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.data}`,
          },
        }
      );
      console.log("Res::", response.data.data);
      setMovies(response?.data?.data);
    };
    data();
  }, []);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

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

  return (
    <>
      {!movies.length ? (
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
              {movies &&
                movies
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((movie) => (
                    <div key={movie.Movie.id} className="movie-card">
                      <div className="movie-card-img">
                        <img
                          src={`http://localhost:8002/images/${movie.Movie.img}`}
                          alt="movie"
                        />
                      </div>
                      <div className="movie-card-content">
                        <h5>{movie.Movie.title}</h5>
                        <div className="movie-card-inner-content">
                          <p>{movie.Movie.publish_year}</p>
                          {userPermissions.some(
                            (permission) => permission === "edit"
                          ) ? (
                            <Link to={`/edit/${movie.movieId}`}>
                              <MdEdit />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </section>

          <div className="pagination">
            <button onClick={handlePrevious}>&laquo; Previous</button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNext}>Next &raquo;</button>
          </div>

          <MovieFooter />
        </>
      )}
    </>
  );
};

export default FaviroteMoviesComp;
