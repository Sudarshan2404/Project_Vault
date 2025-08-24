import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import HomeIcon from "../assets/navcons/Home.svg";
import ExploreIcon from "../assets/navcons/Explore.svg";
import notiIcon from "../assets/navcons/Notifications.svg";
import ProfileIcon from "../assets/navcons/person.svg";
import useAuth from "../hooks/Useauth";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="h-screen w-full bg-[#01001F]">
        <div className="w-[18rem] h-screen hidden md:flex flex-col border-r-1 border-gray-700 py-2">
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
          <div className="flex flex-col gap-11 p-2 mt-6 ml-2">
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 filter invert"
                src={HomeIcon}
                alt="Home icon"
              />
              <Link
                className="Roboto text-xl text-white text-center font-bold mt-1"
                to="/"
              >
                Home
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 filter invert"
                src={ExploreIcon}
                alt="Explore icon"
              />
              <Link
                className="Roboto text-xl text-white text-center font-bold mt-1"
                to="/explore"
              >
                Explore
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 filter invert"
                src={notiIcon}
                alt="Notification icon"
              />
              <Link
                className="Roboto text-xl text-white text-center font-bold mt-1"
                to="/notifications"
              >
                Notification
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 filter invert"
                src={ProfileIcon}
                alt="Profile icon"
              />
              <Link
                className="Roboto text-xl text-white text-center font-bold mt-1"
                to="/profile"
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="w-full h-fit flex items-end border-t border-gray-700 mt-auto">
            <Link to="/profile">
              <div className="flex items-center justify-center p-5 gap-2  w-[100%]">
                <img
                  className="w-14 h-14 rounded-full"
                  src={user?.avtar}
                  alt=""
                />
                <div className="flex flex-col w-full ml-2">
                  <h2 className="Roboto text-xl font-semibold text-white">
                    {user?.name}
                  </h2>
                  <h4 className="text-[18px] text-gray-400">
                    @{user?.username}
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
