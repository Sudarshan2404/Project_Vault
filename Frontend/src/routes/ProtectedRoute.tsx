import Loader from "../components/Loader.tsx";
import useAuth from "../hooks/Useauth.tsx";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader message="Loading..." color="border-green-500" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
