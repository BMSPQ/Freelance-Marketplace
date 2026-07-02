import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    loading,
  } = useContext(AuthContext);

  // Wait until authentication is checked
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;