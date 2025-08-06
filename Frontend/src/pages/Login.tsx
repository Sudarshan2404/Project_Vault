import { useRef, useState } from "react";
import Logo from "../assets/Logo.svg";
import GoogleAl from "../assets/GoogleAuth.png";
import GithubAl from "../assets/GithubAuth.png";
import api from "../api/axios.tsx";
import useAuth from "../hooks/Useauth.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  interface LoginResponse {
    data: {
      success: boolean;
      message: string;
    };
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string | null>(null);

  const { fetchUser } = useAuth();
  const navigate = useNavigate();
  const HandleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setMessage(null);
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const res: LoginResponse = await api.post(
        "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data.message);
      if (!res.data.success) {
        setMessage(res.data.message);
        return;
      }

      await fetchUser();
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        toast.error(message);
      } else if (error instanceof Error) {
        setMessage("An unexpected error occurred.");
      } else {
        setMessage("Unknown error.");
      }
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-[#01001F] flex justify-center">
        <div className="flex items-center gap-40">
          <div>
            <img
              className="w-[22rem] h-[22rem]"
              src={Logo}
              alt="project vault logo"
            />
          </div>
          <div className="flex flex-col gap-16">
            <div>
              <h1 className="text-white text-5xl text-center kavoon">
                Project Vault
              </h1>
            </div>
            <div className="flex flex-col Roboto ">
              <form
                method="post"
                onSubmit={HandleLogin}
                className="flex flex-col gap-5"
              >
                <input
                  ref={usernameRef}
                  className="w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl outline-0 placeholder:text-xl placeholder:text-[#4345A6]"
                  type="text"
                  placeholder="Username"
                  name="username"
                  id="username"
                />
                <div className="flex flex-col gap-2.5">
                  <input
                    ref={passwordRef}
                    className="w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl outline-0 placeholder:text-xl placeholder:text-[#4345A6]"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <button className="text-[12px] text-white text-right mr-1.5 font-semibold m-0 p-0 cursor-pointer">
                    Forgot Password?
                  </button>
                </div>
                <button className="w-[26rem] h-auto mt-3 bg-[#4345A6] text-xl text-[#ffffff] font-bold py-2 rounded-xl cursor-pointer">
                  Login
                </button>
              </form>
              <div className="flex gap-2.5 items-center justify-center mt-8 mb-2">
                <button className="cursor-pointer">
                  <img
                    className="w-12 h-auto"
                    src={GoogleAl}
                    alt="Google Logo"
                  />
                </button>
                <button className="cursor-pointer">
                  <img
                    className="w-12 h-auto"
                    src={GithubAl}
                    alt="Github Logo"
                  />
                </button>
              </div>
              <h3 className="text-[16px] text-white text-center">
                Dont have an account?{" "}
                <span className="text-[#4345A6] text-[14px] cursor-pointer font-extrabold underline underline-offset-2 decoration-[#4345A6]">
                  Sign Up
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* ✅ Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default Login;
