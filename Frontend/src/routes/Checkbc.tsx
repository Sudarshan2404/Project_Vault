import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CheckBc = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await api.get("/ping");
        if (!res) {
          return navigate("/500");
        }
        console.log("Backend Response", res);
      } catch (err) {
        console.error("Internal server error:", err);
        navigate("/500");
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, [navigate]);

  if (loading) return <div>Checking backend...</div>;

  return <>{children}</>;
};

export default CheckBc;
