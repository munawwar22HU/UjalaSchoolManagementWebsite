import React, { useEffect } from "react";

import Sidebar from "../components/Common/Layout/sidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Admin(props) {
  const routes = [
    {
      name: "Users",
      class: "nav-icon fas fa-users",
      routes: [
        {
          to: "/admin/register-user",
          class: "nav-icon fas fa-user-plus",
          name: "Register User",
        },
        {
          to: "/admin/manage-users",
          class: "nav-icon fas fa-user-edit",
          name: "Manage Users",
        },
      ],
    },
  ];

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser && currentUser.role === "Admin") {
      props.history.push("/admin/profile");
    } else {
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <Sidebar routes={routes} />
      <Switch>
        {props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}
