import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import React from "react";
import routes from "./Routes";
import RouteWithSubRoutes from "./utils/RoutesWithSubRoutes";
import NotFound from "./components/NotFound.js";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        render={(props) => props.location.pathname !== "/login" && <Header />}
      />
      <Switch>
        <Redirect exact from="/" to="/login" />
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route component={NotFound} />
      </Switch>
      <Route
        path="/"
        render={(props) => props.location.pathname !== "/login" && <Footer />}
      />
    </BrowserRouter>
  );
}
