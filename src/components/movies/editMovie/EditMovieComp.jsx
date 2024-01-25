// import React, { useState, useCallback, useEffect } from "react";
// import { FiDownload } from "react-icons/fi";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams, useNavigate } from "react-router-dom";
// import "../movies.css";

// const EditMovieComp = () => {
//   const { movieId } = useParams();
//   console.log(movieId);
//   const navigate = useNavigate();
//   const token = JSON.parse(localStorage.getItem("loginUser")) || null;

//   const [movieData, setMovieData] = useState({
//     img: "",
//     title: "",
//     publish_year: "",
//   });

//   const [userValue, setUserValue] = useState({
//     img: "",
//     title: "",
//     publish_year: "",
//   });

//   const [uploadedImage, setUploadedImage] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8002/api/v1/movie/${movieId}`
//         );
//         console.log("Res:", response);
//         const fetchedMovieData = response.data.data;

//         setMovieData(fetchedMovieData);
//         setUserValue(fetchedMovieData);
//       } catch (error) {
//         console.error("Error fetching movie details:", error.message);
//       }
//     };

//     fetchMovieDetails();
//   }, [movieId]);

//   const userData = (e) => {
//     const { name, value } = e.target;
//     setUserValue((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const onDrop = useCallback((acceptedFiles) => {
//     const file = acceptedFiles[0];
//     setUploadedImage(file);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/*",
//   });

//   const formData = new FormData();

//   const submitUserData = async (e) => {
//     e.preventDefault();

//     try {
//       formData.append("file", uploadedImage);

//       // Append other form data
//       Object.entries(userValue).forEach(([key, value]) => {
//         formData.append(key, value);
//       });

//       const response = await axios.put(
//         `http://localhost:8002/api/v1/movie/${movieId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token.data}`,
//           },
//         }
//       );

//       console.log("Image upload response:", response.data);

//       setUserValue({
//         title: "",
//         publish_year: "",
//         img: "", // Reset img to an empty string after the update
//       });
//       setUploadedImage(null);

//       // Display success message using toastify
//       toast.success("Movie updated successfully!");

//       // Redirect to the movies page
//       navigate("/movies");
//     } catch (error) {
//       console.error("Error updating movie:", error.message);
//       // Display error message using toastify
//       toast.error("Error updating movie. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     toast.info("Update cancelled.");
//     setUserValue({ ...movieData });
//     setUploadedImage(null);
//     navigate("/movies");
//   };

//   return (
//     <>
//       <section className="add-new-movie">
//         <div className="add-new-movie-wraper section-spacing">
//           <h2>Edit Movie</h2>
//           <div
//             className={`add-new-movie-content ${
//               isDragActive ? "drag-active" : ""
//             }`}
//           >
//             <div className="upload-movie-img" {...getRootProps()}>
//               {uploadedImage || movieData?.img ? (
//                 <img
//                   src={
//                     uploadedImage
//                       ? URL.createObjectURL(uploadedImage)
//                       : `http://localhost:8002/images/${movieData.img}`
//                   }
//                   alt="Uploaded Preview"
//                 />
//               ) : (
//                 <>
//                   <div>
//                     <FiDownload />
//                   </div>
//                   <div>
//                     <p>Click to upload</p>
//                   </div>
//                 </>
//               )}
//               <input {...getInputProps()} />
//             </div>

//             <div className="movie-signup-form add-movie-form">
//               <form onSubmit={submitUserData}>
//                 <input
//                   type="text"
//                   placeholder="Title"
//                   value={userValue.title}
//                   name="title"
//                   onChange={userData}
//                 />
//                 <input
//                   type="number"
//                   placeholder="Publishing year"
//                   value={userValue.publish_year}
//                   name="publish_year"
//                   onChange={userData}
//                 />

//                 <div className="add-movie-btns">
//                   <button
//                     type="button"
//                     className="btn-secondary"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                   <input type="submit" value="Update" className="btn-primary" />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//       <ToastContainer />
//     </>
//   );
// };

// export default EditMovieComp;

import React, { useState, useCallback, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../movies.css";
import { editMovie, singleMovie } from "../../../redux/actions/MovieAction";

const EditMovieComp = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("loginUser")) || null;
  const dispatch = useDispatch();

  const [movieData, setMovieData] = useState({
    img: "",
    title: "",
    publish_year: "",
  });

  const { movie, error, isLoading } = useSelector(
    (movie) => movie.movieReducer
  );

  console.log("Movie Single::", movie);

  const [userValue, setUserValue] = useState({
    img: "",
    title: "",
    publish_year: "",
  });

  console.log({ userValue });

  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const data = dispatch(singleMovie(movieId, formData, token.data));
    console.log("MoD::", data);
  }, []);
  useEffect(() => {
    if (movie.title) {
      // console.log("MoD33::", movie);
      const modified = {
        img: movie.img,
        title: movie.title,
        publish_year: movie.publish_year,
      };
      setUserValue(modified);
    }
  }, [movie]);

  // useEffect(() => {
  //   const fetchMovieDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8002/api/v1/movie/${movieId}`
  //       );
  //       console.log("Res:", response);
  //       const fetchedMovieData = response.data.data;

  //       setMovieData(fetchedMovieData);
  //       setUserValue(fetchedMovieData);
  //     } catch (error) {
  //       console.error("Error fetching movie details:", error.message);
  //     }
  //   };

  //   fetchMovieDetails();
  // }, [movieId]);

  const userData = (e) => {
    const { name, value } = e.target;
    setUserValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const formData = new FormData();

  const submitUserData = async (e) => {
    e.preventDefault();

    try {
      formData.append("file", uploadedImage);

      Object.entries(userValue).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // const response = await axios.put(
      //   `http://localhost:8002/api/v1/movie/${movieId}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token.data}`,
      //     },
      //   }
      // );

      dispatch(editMovie(movieId, formData, token.data));
      // setUserValue(movie);

      setUserValue({
        title: "",
        publish_year: "",
        img: "",
      });
      setUploadedImage(null);

      // Display success message using toastify
      toast.success("Movie updated successfully!");

      // Redirect to the movies page
      navigate("/movies");
    } catch (error) {
      console.error("Error updating movie:", error.message);
      // Display error message using toastify
      toast.error("Error updating movie. Please try again.");
    }
  };

  const handleCancel = () => {
    toast.info("Update cancelled.");
    setUserValue({ ...movieData });
    setUploadedImage(null);
    navigate("/movies");
  };

  return (
    <>
      <section className="add-new-movie">
        <div className="add-new-movie-wraper section-spacing">
          <h2>Edit Movie</h2>
          <div
            className={`add-new-movie-content ${
              isDragActive ? "drag-active" : ""
            }`}
          >
            <div className="upload-movie-img" {...getRootProps()}>
              {uploadedImage || movie?.img ? (
                <img
                  src={
                    uploadedImage
                      ? URL.createObjectURL(uploadedImage)
                      : `http://localhost:8002/images/${userValue?.img}`
                  }
                  alt="Uploaded Preview"
                />
              ) : (
                <>
                  <div>
                    <FiDownload />
                  </div>
                  <div>
                    <p>Click to upload</p>
                  </div>
                </>
              )}
              <input {...getInputProps()} />
            </div>

            <div className="movie-signup-form add-movie-form">
              <form onSubmit={submitUserData}>
                <input
                  type="text"
                  placeholder="Title"
                  value={userValue.title}
                  name="title"
                  onChange={userData}
                />
                <input
                  type="number"
                  placeholder="Publishing year"
                  value={userValue.publish_year}
                  name="publish_year"
                  onChange={userData}
                />

                <div className="add-movie-btns">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <input type="submit" value="Update" className="btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default EditMovieComp;
