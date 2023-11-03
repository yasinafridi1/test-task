import { Navigate } from "react-router-dom";

const RedirectRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/vehicle-info" replace />;
  }
  return children;
};

export default RedirectRoute;
