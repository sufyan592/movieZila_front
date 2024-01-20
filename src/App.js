import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import MovieNotFound from "./pages/MovieNotFound";
import Movies from "./pages/Movies";
import NewMovie from "./pages/NewMovie";
import EditMovie from "./pages/EditMovie";
import "./responsive.css";
import FavMovies from "./pages/FavMovies";
import { MoviePrivateRoute } from "./components/privateRoute/MoviePrivateRoute";
import Users from "./pages/Users";
import { AdminPrivateRoute } from "./components/privateRoute/AdminPrivateRoute";
import {
  PrivateRoute,
  UserPermissionPrivateRoute,
} from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/nomovie" element={<MovieNotFound />}></Route>
          <Route path="/movies" element={<Movies />}></Route>

          <Route element={<MoviePrivateRoute />}>
            <Route path="/addmovie" element={<NewMovie />}></Route>
            {/* <Route path="/edit/:movieId" element={<EditMovie />}></Route> */}
            <Route path="/favMovies" element={<FavMovies />}></Route>
          </Route>
          <Route element={<PrivateRoute edit={"edit"} />}>
            <Route path="/edit/:movieId" element={<EditMovie />}></Route>
            <Route path="/addmovie" element={<EditMovie />}></Route>
          </Route>
          <Route element={<PrivateRoute delete={"delete"} />}>
            <Route path="/delete" element={<EditMovie />}></Route>
          </Route>
          <Route element={<PrivateRoute create={"create"} />}>
            <Route path="/addmovie" element={<EditMovie />}></Route>
          </Route>

          <Route path="/users" element={<Users />}></Route>
          <Route element={<AdminPrivateRoute />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
