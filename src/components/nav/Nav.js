import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./nav.css";

const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const loginUser = JSON.parse(localStorage.getItem("loginUser")) || null;
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
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
          {loginUser && loginUser ? (
            <ul>
              <li>
                <NavLink to="/movies">Movies</NavLink>
              </li>
              <li>
                <NavLink to="/favMovies">Favorite Movies</NavLink>
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
