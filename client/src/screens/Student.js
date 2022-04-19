import React, { useEffect } from "react";
import Sidebar from "../components/sidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Student(props) {

  const routes = [
    {
      name: "Students",
      class: "nav-icon fas fa-user-graduate",
      routes: [
        {
          to: "/student/add-student",
          class: "nav-icon fas fa-user-plus",
          name: "Add Student",
        },
        {
          to: "/student/manage-student",
          class: "nav-icon fas fa-user-edit",
          name: "Manage Students",
        },
      ],
    },
    {
      name: "Teachers",
      class: "nav-icon fas fa-chalkboard-teacher",
      routes: [
        {
          to: "/student/add-teacher",
          class: "nav-icon fas fa-user-plus",
          name: "Add Teacher",
        },
        {
          to: "/student/manage-teacher",
          class: "nav-icon fas fa-user-edit",
          name: "Manage Teachers",
        },
      ],  
    },{
      name: "School Leaving Certificate",
      class: "nav-icon fas fa-certificate",
      routes: [
        {
          name: "Issue Leaving Certificate",
          to: "/student/add-certificate",
          class: "nav-icon fas fa-id-card",
          
        },
        {
          to: "/student/manage-certificate",
          class: "nav-icon fas fa-receipt",
          name: "View Leaving Certificate",
        },
      ],  
    }
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
