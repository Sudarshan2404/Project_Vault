import { useNavigate } from "react-router-dom";
// import api from "../api/axios.tsx";
import useAuth from "../hooks/Useauth.tsx";

const Avtar_bio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div></div>
    </>
  );
};

export default Avtar_bio;
