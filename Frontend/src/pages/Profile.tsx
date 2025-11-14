import Vertnav from "../components/Vertnav";
import useAuth from "../hooks/Useauth";
import novice from "../assets/Banners/NOVICE.png";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="min-h-screen w-screen flex bg-[#01001F]">
        <Vertnav />
        <div className="w-full h-screen text-white text-4xl md:ml-72.5">
          <div className="flex flex-col max-w-[65%] relative">
            <div className="w-full">
              <img
                src={novice}
                alt="Novice Banner"
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="flex flex-col w-full h-full gap-2 absolute top-38">
              <div className="flex px-5">
                <img
                  className="w-[140px] h-[140px] rounded-full border-3 border-[#4f53b9]"
                  src={user?.avtar}
                  alt="Profile picture"
                />
              </div>
              <div className="flex flex-col text-white Roboto gap-1 mr-[-50px] px-2">
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
                    @{user?.username}
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
