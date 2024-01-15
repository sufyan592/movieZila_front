import React, { useState, useCallback, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../newMovie/newmovie.css";
import { useParams, useNavigate } from "react-router-dom";

const EditMovieComp = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  // const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [userValue, setUserValue] = useState({
    img: "",
    title: "",
    publish_year: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8002/api/v1/movie/${movieId}`
        );
        setUserValue(response.data.data);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

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

  const submitUserData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", uploadedImage);

      // Append other form data
      Object.entries(userValue).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.put(
        `http://localhost:8002/api/v1/movie/${movieId}`,
        formData
      );

      console.log("Image upload response:", response.data);

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
    }
  };

  const handleCancel = () => {
    setUserValue({
      title: "",
      publish_year: "",
      img: "",
    });
    setUploadedImage(null);

    // Display cancellation message using toastify
    toast.info("Update cancelled.");
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
              {uploadedImage ? (
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded Preview"
                />
              ) : (
                <>
                  <div>
                    <FiDownload />
                  </div>
                  <div>
                    <p>Drop an image here or click to upload</p>
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
                  <input
                    type="button"
                    value="Cancel"
                    className="btn-secondary"
                    onClick={handleCancel}
                  />
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
