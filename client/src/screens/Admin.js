import React, { useEffect } from "react";

import Sidebar from "../components/sidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Admin(props) {
  const routes = [
    {
      to: "/admin/dashboard",
      class: "nav-icon fas fa-tachometer-alt",
      name: "Dashboard",
    },
    {
      to: "/admin/dashboard",
      class: "nav-icon fas fa-tachometer-alt",
      name: "Dashboard",
    },
  ];
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
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
