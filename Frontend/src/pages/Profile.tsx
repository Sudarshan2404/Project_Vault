import Vertnav from "../components/Vertnav";
import useAuth from "../hooks/Useauth";
import novice from "../assets/Banners/NOVICE.png";
import { Link} from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [seepp, setSeepp] = useState(false)
  return (
    <>
      {seepp && (
        <div className="w-screen h-screen md:w-screen md:h-screen absolute z-20 flex">
          <div
            onClick={() => setSeepp(false)}
            className="absolute bg-black w-full h-full opacity-70"
          ></div>
          <div className="items-start z-50 text-xl m-10"></div>
          <div className="w-full h-full flex items-center justify-center content-between">
            <img
              src={user?.avtar}
              alt="User Profile"
              className="w-60 h-60 md:w-80 md:h-80 rounded-full opacity-100 border-2 object-cover border-[#4f53b9] z-30"
            />
          </div>
        </div>
      )}
      <div className="w-screen bg-black/70 h-[40px] md:hidden absolute flex z-1 items-center mb-1s">
        <Link
          className="text-white pl-1 flex items-center text-4xl Roboto"
          to="/"
        >
          <p className="text-[18px]">
            <span className="text-2xl">&larr;</span> Profile
          </p>
        </Link>
      </div>
      <div className="w-screen min-h-screen  flex bg-[#01001F] relative overflow-x-hidden">
        <Vertnav />
        <div className="w-full min-h-screen text-white md:ml-72.5">
          <div className="flex flex-col w-full md:max-w-[70%] relative">
            <div className="w-full">
              <img
                src={novice}
                alt="Novice Banner"
                className="w-full h-[180px] md:h-[200px] object-cover"
              />
            </div>
            <div className="flex w-full">
              <div className="flex flex-col w-full h-full gap-2 absolute top-35 md:top-38">
                <button
                  onClick={() => setSeepp(true)}
                  className="cursor-pointer"
                >
                  <div className="flex md:px-5 px-1">
                    <img
                      className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full border-3 border-[#4f53b9]"
                      src={user?.avtar}
                      alt="Profile picture"
                    />
                  </div>
                </button>
                <div className="flex flex-col text-white Roboto mr-[-50px] px-3">
                  <h1 className="font-semibold text-xl md:text-2xl text-left">
                    {user?.name}
                  </h1>
                  <h2 className="font-semibold text-white text-[16px] mb-2 text-left mt-0.5">
                    @{user?.username}
                  </h2>
                  <div className="flex gap-8 md:gap-15">
                    <h3 className="text-[18px] md:text-[22px] Roboto text-center gap-1 flex items-center">
                      0
                      <span className="text-[#474AAF] text-[15px] md:text-[17px] font-semibold text-center">
                        Projects
                      </span>
                    </h3>
                    <h3 className="text-[18px] md:text-[22px] Roboto text-center gap-1 flex items-center">
                      {user?.followers.length}
                      <span className="text-[#474AAF] text-[15px] md:text-[17px] font-semibold text-center">
                        followers
                      </span>
                    </h3>
                    <h3 className="text-[18px] md:text-[22px] Roboto text-center gap-1 flex items-center">
                      {user?.following.length}
                      <span className="text-[#474AAF] text-[15px] md:text-[17px] font-semibold text-center">
                        following
                      </span>
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white text-[16px] Roboto md:text-[18px] text-left tracking-[1px]">
                      {user?.bio}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end py-2 px-2 z-1">
                <button
                  onClick={() => alert("HEllo mf")}
                  className="text-[14px] md:text-[18px] py-1.5 md:py-2 px-5 cursor-pointerfont-medium border-1 border-[#474AAf] rounded-full hover:bg-[#020031]"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
