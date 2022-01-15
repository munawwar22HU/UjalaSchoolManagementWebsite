import React, { useEffect } from "react";
import StudentSidebar from "../components/Student/studentSidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Admin(props) {
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.role === "Admin") {
      props.history.push("/admin");
    } else {
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <StudentSidebar />
    </div>
  );
}
