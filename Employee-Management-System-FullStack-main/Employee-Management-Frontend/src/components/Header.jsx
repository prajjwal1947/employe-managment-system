import React from 'react';
import { isUserLoggedIn, logout } from "../services/AuthService";
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();

  function handlLogout() {
    logout();
    navigate("");
  }
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a href='/' className='title'>Welcome To Employee Management System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {isAuth && (
                <li className="nav-item">
                  <NavLink to="/list" className="nav-link">
                    List
                  </NavLink>
                </li>
              )}
              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}
              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              )}
              {isAuth && (
                <li className="nav-item">
                  <NavLink
                    to=""
                    className="nav-link"
                    onClick={handlLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header