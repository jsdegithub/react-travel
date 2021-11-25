import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ path, component, isAuthenticated }) => {
  const PrivateRouteComponent = () => {
    return isAuthenticated ? (
      React.createElement(component)
    ) : (
      <Redirect to={"/login"}></Redirect>
    );
  };

  return <Route path={path} render={PrivateRouteComponent} />;
};
