import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
export default function Sidebar({ routes }) {
  const [user, setUser] = useState({
    name: "",
    image: "",
    role: "",
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/login";
    } else {
      setUser({
        ...user,
        name: currentUser.name,
        role: currentUser.role,
        image: currentUser.image,
        id: currentUser.id,
      });
    }
  }, []);
  return (
    <div>
      <aside
        className="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4 full-height"
        style={{ position: "fixed" }}
      >
        {/* Brand Logo */}
        <a
          href="https://www.parentsvoice-association.org/"
          className="brand-link"
        >
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
              <img
                src={user.image}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a
                href={`/${user.role.toLowerCase()}/profile`}
                className="d-block"
              >
                {user.name}
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
              {routes.map((route, i) => (
                <li className="nav-item" key={i}>
                  <Link to={route.to} className="nav-link">
                    <i className={route.class} />
                    <p>{route.name}</p>
                  </Link>
                </li>
              ))}
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
