import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Movies from "./pages/movies/Movies";
import NewMovie from "./pages/movies/NewMovie";
import EditMovie from "./pages/movies/EditMovie";
import FavouriteMovie from "./pages/movies/FavouriteMovies";
import { MoviePrivateRoute } from "./routes/private-routes/MoviePrivateRoute";
import Users from "./pages/users/Users";
import { AdminPrivateRoute } from "./routes/private-routes/AdminPrivateRoute";
import {
  PrivateRoute,
  UserPermissionPrivateRoute,
} from "./routes/private-routes/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/movies" element={<Movies />}></Route>

          <Route element={<MoviePrivateRoute />}>
            <Route path="/addmovie" element={<NewMovie />}></Route>
            {/* <Route path="/edit/:movieId" element={<EditMovie />}></Route> */}
            <Route
              path="/favourite-movies"
              element={<FavouriteMovie />}
            ></Route>
          </Route>
          <Route element={<PrivateRoute edit={"edit"} />}>
            <Route path="/edit/:movieId" element={<EditMovie />}></Route>
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
