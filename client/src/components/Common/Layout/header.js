import React from "react";

import AuthService from "../../../services/auth.service";
export default function Header() {
  const handleLogout = () => {
    AuthService.logout();
    window.location.reload(false);
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button type="button" onClick={handleLogout}>
            <i className="nav-icon fa fa-sign-out-alt" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
