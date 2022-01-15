import React from "react";
import {Link} from "react-router-dom";
export default function StudentSidebar() {
    return (
        <div>
        <aside
          className="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4 full-height"
          style={{ position: "fixed" }}
        >
          {/* Brand Logo */}
          <a href="../../index3.html" className="brand-link">
            <img
              src="../../dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="../../dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Alexander Pierce
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
                  <Link to="/home/dashboard" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/home/add-student" className="nav-link">
                    <i className="nav-icon fa fa-user-plus" />
                    <p>Add Student</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/home/manage-student" className="nav-link">
                    <i
                      className="nav-icon fas fa-user-edit"
                      aria-hidden="true"
                    />
                    <p>Manage Student</p>
                  </Link>

                  <li className="nav-item">
                    <Link
                      to="/home/add-external-organisation"
                      className="nav-link"
                    >
                      <i className="nav-icon fas fa-user-plus" />
                      <p>Add External Organization</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/home/manage-external-organisation" className="nav-link">
                      <i className="nav-icon fas fa-user-edit" />
                      <p>Manage External Organization</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/home/health-card" className="nav-link">
                      <i className="nav-icon fas fa-h-square" />
                      <p>Manage Health Card</p>
                    </Link>
                  </li>
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
    )
}