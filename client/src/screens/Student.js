import React, { useEffect } from "react";
import Sidebar from "../components/sidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Student(props) {
  const routes = [
    {
      to: "/student/dashboard",
      class: "nav-icon fas fa-tachometer-alt",
      name: "Dashboard",
    },
    {
      to: "/student/add-student",
      class: "nav-icon fas fa-user-plus",
      name: "Add Student",
    },
    {
      to: "/student/manage-student",
      class: "nav-icon fas fa-user-edit",
      name: "Manage Student",
    },
    {
      to: "/student/add-external-organisation",
      class: "nav-icon fas fa-user-plus",
      name: "Add External Organisation",
    },
    {
      to: "/student/manage-external-organisation",
      class: "nav-icon fas fa-user-edit",
      name: "Manage External Organization",
    },
    {
      to: "/student/health-card",
      class: "nav-icon fas fa-h-square",
      name: "Health Card",
    },
  ];
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser && currentUser.role === "Student") {
      props.history.push("/student/profile");
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
