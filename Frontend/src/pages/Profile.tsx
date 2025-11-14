import Vertnav from "../components/Vertnav";
import useAuth from "../hooks/Useauth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="h-screen w-screen flex bg-[#01001F]">
        <div className="w-fir h-full">
          <Vertnav />
        </div>
        <div className="w-full h-screen text-white text-4xl py-18 px-15 ml-20">
          <div className="flex flex-col">
            <div>
              
            </div>
            <div className="flex w-full h-full gap-20">
              <div className="flex">
                <img
                  className="w-[112px] h-[112px] rounded-full border-3 border-[#4f53b9] mt-3"
                  src={user?.avtar}
                  alt="Profile picture"
                />
              </div>
              <div className="flex flex-col text-white Roboto gap-2">
                <h1 className="font-semibold text-2xl text-left mb-2">
                  {user?.name}
                </h1>
                <div className="flex gap-15">
                  <h3 className="text-[22px] Roboto text-center gap-1 flex items-center">
                    0
                    <span className="text-[#474AAF] text-[17px] font-semibold text-center">
                      Projects
                    </span>
                  </h3>
                  <h3 className="text-[22px] Roboto text-center gap-1 flex items-center">
                    {user?.followers.length}
                    <span className="text-[#474AAF] text-[17px] font-semibold text-center">
                      followers
                    </span>
                  </h3>
                  <h3 className="text-[22px] Roboto text-center gap-1 flex items-center">
                    {user?.following.length}
                    <span className="text-[#474AAF] text-[17px] font-semibold text-center">
                      following
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-white text-xl text-left">
                    {user?.username}
                  </h2>
                  <h4 className="text-white text-[18px] text-left tracking-[1px]">
                    {user?.bio}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
