import React, { useEffect } from "react";
import StudentSidebar from "../components/Student/studentSidebar.js";
import RouteWithSubRoutes from "../utils/RoutesWithSubRoutes";
import AuthService from "../services/auth.service";
import { Switch } from "react-router-dom";

export default function Student(props) {
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      props.history.push("/home/manage-student");
    } else {
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <StudentSidebar />
      <Switch>
        {props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}
