import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import HomeIcon from "../assets/navcons/Home.svg";
import ExploreIcon from "../assets/navcons/Explore.svg";
import notiIcon from "../assets/navcons/Notifications.svg";
import ProfileIcon from "../assets/navcons/person.svg";
import useAuth from "../hooks/Useauth";
import api from "../api/axios";
import LogoutIcon from "../assets/logout.svg";
import { useState } from "react";

const Vertnav = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name);

  if (name && name.length > 18) {
    setName((e) => e?.split(" ")[0]);
  }
  const handleLogout = async () => {
    try {
      const logout = await api.post("/auth/logout");
      if (logout.data.success) {
        window.location.href = "/auth";
      }
    } catch (error: any) {
      if (error.status === 500) {
        navigate("/500");
      }
    }
  };
  return (
    <>
      <div className="w-[18rem] h-screen hidden md:flex flex-col border-r-1 border-gray-700 py-2 fixed bg-[#01001F]">
        <div className="border-b border-gray-700 w-full">
          <div className=" md:flex justify-start items-center gap-3 p-2 w-full h-auto mb-2">
            <img
              className="h-9 w-9 rounded-[10px]"
              src={Logo}
              alt="ProjectVault"
            />
            <h4 className="kavoon text-[18px] text-white">Project Vault</h4>
          </div>
        </div>
        <div className="flex flex-col gap-8 p-2 mt-6 ml-2">
          <div className="flex gap-2 items-center">
            <img
              className="w-6 h-6 filter invert"
              src={HomeIcon}
              alt="Home icon"
            />
            <Link
              className="Roboto text-[16px] text-white text-center font-bold mt-1"
              to="/"
            >
              Home
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="w-6 h-6 filter invert"
              src={ExploreIcon}
              alt="Explore icon"
            />
            <Link
              className="Roboto text-[16px] text-white text-center font-bold mt-1"
              to="/explore"
            >
              Explore
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="w-6 h-6 filter invert"
              src={notiIcon}
              alt="Notification icon"
            />
            <Link
              className="Robototext-[16px] text-white text-center font-bold mt-1"
              to="/notifications"
            >
              Notification
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="w-6 h-6 filter invert"
              src={ProfileIcon}
              alt="Profile icon"
            />
            <Link
              className="Roboto text-[16px] text-white text-center font-bold mt-1"
              to="/profile"
            >
              Profile
            </Link>
          </div>
        </div>
        <div className="w-full h-fit flex items-end border-t border-gray-700 mt-auto">
          <div className="flex items-center justify-center p-5 gap-2  w-[100%]">
            <Link to="/profile">
              <img
                className="w-12 h-10 rounded-full"
                src={user?.avtar}
                alt="User avtar"
              />
            </Link>
            <div className="flex flex-col w-full ml-2">
              <div className="flex items-center w-full">
                <h2 className="Roboto text-[16px] font-semibold text-white">
                  {name}
                </h2>
                <button
                  className="justify-self-end ml-auto"
                  onClick={handleLogout}
                >
                  <img
                    className="w-[19px] h-[19px] cursor-pointer"
                    src={LogoutIcon}
                    alt="Logout button"
                  />
                </button>
              </div>
              <h4 className="text-[14px] text-gray-400">@{user?.username}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vertnav;
