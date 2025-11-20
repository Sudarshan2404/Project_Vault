import { useNavigate } from "react-router-dom";
// import api from "../api/axios.tsx";
import useAuth from "../hooks/Useauth.tsx";

const Avtar_bio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-screen min-h-screen bg-[#01001F]">
        <div className="w-full flex flex-col items-center m-20">
          <img
            src={user?.avtar}
            alt="UserProfile"
            className="w-[200px] h-[200px] rounded-full"
          />
          <form>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="text-white"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Avtar_bio;
