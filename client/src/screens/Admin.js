import React, { useEffect } from "react";
import AdminSidebar from "../components/Admin/adminSidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Admin(props) {
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.role === "Admin") {
      props.history.push("/admin/dashboard");
    } else {
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <AdminSidebar />
      <Switch>
        {props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}
