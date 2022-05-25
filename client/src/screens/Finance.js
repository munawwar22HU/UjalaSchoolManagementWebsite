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
      routes: [
        {
          to: "/finance/add-sponsor",
          name: "Add Sponsors",
          class: "nav-icon fas fa-plus",
        },
        {
          to: "/finance/manage-sponsor",
          name: "Manage Sponsors",
          class: "nav-icon fas fa-list",
        },
        {
          to: "/finance/manage-sponsorship",
          name: "Manage Sponsor Payments",
          class: "nav-icon fas fa-edit",
        },
      ],
    },
    {
      name: "Donors",
      class: "nav-icon fas fa-donate",
      routes: [
        {
          to: "/finance/donor/add-donor",
          class: "nav-icon fas fa-user-plus",
          name: "Add Donor",
        },
        {
          to: "/finance/donor/manage-donor",
          class: "nav-icon fas fa-user-edit",
          name: "Manage Donors",
        },
        {
          to: "/finance/donor/manage-donation",
          class: "nav-icon fas fa-money-check-alt",
          name: "Manage Donor Payments",
        },
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
          to: "/finance/manage-fees",
          class: "nav-icon fas fa-receipt",
          name: "View Fees Vouchers",
        },
        {
          to: "/finance/generate-all",
          class: "nav-icon fas fa-receipt",
          name: "Generate All",
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
