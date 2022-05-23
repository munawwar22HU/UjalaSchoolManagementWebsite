import React, { useEffect } from "react";
import Sidebar from "../components/Common/Layout/sidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Finance(props) {
  const routes = [
    {
      name: "Sponsors",
      class: "nav-icon fas fa-hands-helping",
      routes: [],
      //   routes: [
      //     {
      //       to: "/student/add-student",
      //       class: "nav-icon fas fa-user-plus",
      //       name: "Add Student",
      //     },
      //     {
      //       to: "/student/manage-student",
      //       class: "nav-icon fas fa-user-edit",
      //       name: "Manage Students",
      //     },
      //   ],
    },
    {
      name: "Donors",
      class: "nav-icon fas fa-donate",
      routes: [
        // {
        //   to: "/student/add-teacher",
        //   class: "nav-icon fas fa-user-plus",
        //   name: "Add Teacher",
        // },
        // {
        //   to: "/student/manage-teacher",
        //   class: "nav-icon fas fa-user-edit",
        //   name: "Manage Teachers",
        // },
      ],
    },
    {
      name: "Student Fees",
      class: "nav-icon fas fa-file-invoice-dollar",
      routes: [
        {
          name: "View Students",
          to: "/finance/manage-student",
          class: "nav-icon fas fa-user-plus",
        },
        {
          to: "/finance/manage-student-fees",
          class: "nav-icon fas fa-receipt",
          name: "View Fees Vouchers",
        },
      ],
    },
  ];

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser && currentUser.role === "Finance") {
      props.history.push("/finance/profile");
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
