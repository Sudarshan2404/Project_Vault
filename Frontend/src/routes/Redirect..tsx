import Loader from "../components/Loader.tsx";
import useAuth from "../hooks/Useauth.tsx";
import { Navigate, Outlet } from "react-router-dom";

const RedirectRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader message="Loading..." color="border-green-500" />;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectRoute;
