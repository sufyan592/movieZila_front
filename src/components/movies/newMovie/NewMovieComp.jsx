import React, { useState, useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./newmovie.css";
import { useNavigate } from "react-router-dom";
import "../movies.css";
import { useDispatch } from "react-redux";
import { addMovie } from "../../../redux/actions/MovieAction";

const NewMovieComp = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("loginUser"));
  const dispatch = useDispatch();

  const [userValue, setUserValue] = useState({
    img: "",
    title: "",
    publish_year: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  const userData = (e) => {
    const { name, value } = e.target;
    console.log(value, "loop");
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

      Object.entries(userValue).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // const response = await axios.post(
      //   "http://localhost:8002/api/v1/movie",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token.data}`,
      //     },
      //   }
      // );

      dispatch(addMovie(formData, token.data));

      setUserValue({
        title: "",
        publish_year: "",
        img: "",
      });
      setUploadedImage(null);

      toast.success("New movie added successfully!");
      navigate("/movies");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      toast.error("Error adding new movie");
    }
  };

  const handleCancel = () => {
    setUserValue({
      title: "",
      publish_year: "",
      img: "",
    });
    setUploadedImage(null);

    toast.info("Movie creation cancelled.");
    navigate("/movies");
  };

  return (
    <>
      <section className="add-new-movie">
        <div className="add-new-movie-wraper section-spacing">
          <h2>Create a new movie</h2>
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
                  <input type="submit" value="Submit" className="btn-primary" />
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

export default NewMovieComp;
