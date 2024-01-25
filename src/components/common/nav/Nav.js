import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./nav.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/UserAction";

const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { islogin } = useSelector((state) => state.userReducer);
  console.log("loginUser,", islogin);
  const loginUser = JSON.parse(localStorage.getItem("loginUser")) || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loginUser");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h4>Movie Zila</h4>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <FaBars />
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
          {islogin === true && islogin === true ? (
            <ul>
              <li>
                <NavLink to="/movies">Movies</NavLink>
              </li>
              <li>
                <NavLink to="/favourite-movies">Favorite Movies</NavLink>
              </li>
              <li onClick={handleLogout} className="btn-primary">
                Logout
              </li>
            </ul>
          ) : (
            <ul className="navgationMenu">
              <NavLink to="/movies">
                <li>Movies</li>
              </NavLink>
              <NavLink to="/signin">
                <li className="btn-primary">Sign in</li>
              </NavLink>
              <NavLink to="/signup">
                <li className="btn-secondary">Sign up</li>
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
