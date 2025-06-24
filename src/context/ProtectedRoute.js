import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

// import { Navigate, Outlet } from 'react-router-dom';
// import Cookies from "js-cookie";

// const ProtectedRoute = () => {
//   const token = Cookies.get("token");  // Check authentication on every render

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
