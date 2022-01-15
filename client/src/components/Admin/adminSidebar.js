import React from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
export default function AdminSidebar() {
  const currentUser = authService.getCurrentUser();
  return (
    <div>
      <aside
        className="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4 full-height"
        style={{ position: "fixed" }}
      >
        {/* Brand Logo */}
        <a href="/student" className="brand-link">
          <img
            src="../../images/cropped-ujala-logo-copy.png"
            alt="Ujala Center Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".9" }}
          />
          <span className="brand-text font-weight-light">Ujala Center</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {currentUser && (
                <img
                  src={currentUser.image}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              )}
            </div>
            <div className="info">
              <a href="/student/dashboard" className="d-block">
                {currentUser && currentUser.name}
              </a>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

              <li className="nav-item active">
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </Link>
              </li>
            </ul>
          </nav>

          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}

        {/* /.sidebar-custom */}
      </aside>
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>
    </div>
  );
}
