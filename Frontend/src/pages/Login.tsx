import React, {useRef, useState } from "react";
import Logo from "../assets/Logo.svg";
import GoogleAl from "../assets/GoogleAuth.png";
import GithubAl from "../assets/GithubAuth.png";
import api from "../api/axios.tsx";
import useAuth from "../hooks/Useauth.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  interface AuthResponse {
    data: {
      success: boolean;
      message: string;
    };
  }


  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [toregister, setToregister] = useState(false)

    
  console.log(toregister);
  

  const { fetchUser } = useAuth();
  const navigate = useNavigate();
  const HandleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setMessage(null);
    try {
      const username = usernameRef.current?.value.toLowerCase();
      const password = passwordRef.current?.value;

      const res: AuthResponse = await api.post(
        "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      if (!res.data.success) {
        setMessage(res.data.message);
        return;
      }
      await fetchUser();
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        toast.error(message);
      } else {
        setMessage("Unknown error.");
      }
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try {
          const username = usernameRef.current?.value.toLowerCase();
          const password = passwordRef.current?.value;
          const name = nameRef.current?.value.toLowerCase();
          const email = emailRef.current?.value.toLowerCase();

          if(username && username.length < 4 ){
            toast.error("Username should contain atleast 4 Characters");
            return;
          }
          if(password && password.length < 6){
            toast.error("Password should contain atleast 6 Characters");
            return;
          }
          const res: AuthResponse = await api.post(
            "/auth/register", {
              username,
              password,
              name,
              email
            }
          )

          if(!res.data.success){
            setMessage(res.data.message)
            toast.error(message)
            return;
          }
          await fetchUser();
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/")
          },1000)

    } catch (error :any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
        toast.error(message);
      } else {
        setMessage("Unknown error.");
      }
    }
  }

  return (
    <>
      <div className="h-screen">
        <div className="w-screen h-full bg-[#01001F] flex justify-center">
          <div className="flex items-center md:gap-40">
            <div className="hidden lg:flex">
              <img
                className="w-[22rem] h-[22rem]"
                src={Logo}
                alt="project vault logo"
              />
            </div>
            <div className="flex flex-col gap-16 mt-0">
              <div className="flex gap-4 items-center justify-center">
                <img
                  className="w-10 h-auto rounded-xl lg:hidden"
                  src={Logo}
                  alt="Project Vault"
                />
                <h1 className="text-white text-4xl md:text-5xl text-center kavoon">
                  Project Vault
                </h1>
              </div>
              <div className="flex flex-col Roboto items-center justify-center ">
                {toregister ? (
                  <form
                    method="post"
                    onSubmit={handleRegister}
                    className="flex flex-col gap-5"
                  >
                    <input
                      ref={usernameRef}
                      className="w-[18rem] md:w-[28rem] lg:w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl outline-0 placeholder:text-[16px] md:placeholder:text-xl placeholder:text-[#4345A6]"
                      type="text"
                      placeholder="Username"
                      name="username"
                      id="username"
                    />
                    <input
                      ref={nameRef}
                      className="w-[18rem] md:w-[28rem] lg:w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl outline-0 placeholder:text-[16px] md:placeholder:text-xl placeholder:text-[#4345A6]"
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      id="name"
                    />
                    <input
                      ref={emailRef}
                      className="w-[18rem] md:w-[28rem] lg:w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl outline-0 placeholder:text-[16px] md:placeholder:text-xl placeholder:text-[#4345A6]"
                      type="email"
                      placeholder="Email Adress"
                      name="email"
                      id="email"
                    />
                    <div className="flex flex-col gap-2.5">
                      <input
                        ref={passwordRef}
                        className="w-[18rem]md:w-[28rem] lg:w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl placeholder:text-[16px] outline-0 md:placeholder:text-xl placeholder:text-[#4345A6]"
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
                      {/* <button className="text-[9.5px] md:text-[12px] text-white text-right mr-1.5 font-semibold m-0 p-0 cursor-pointer">
                        Forgot Password?
                      </button> */}
                    </div>
                    <button className="w-[18rem] md:w-[28rem] lg:w-[26rem] h-auto mt-3 bg-[#4345A6] text-[18px] md:text-xl text-[#ffffff] font-bold py-2 rounded-xl cursor-pointer">
                      Sign up
                    </button>
                  </form>
                ) : (
                  <form
                    method="post"
                    onSubmit={HandleLogin}
                    className="flex flex-col gap-5"
                  >
                    <input
                      ref={usernameRef}
                      className="w-[18rem] md:w-[28rem] lg:w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl outline-0 placeholder:text-[16px] md:placeholder:text-xl placeholder:text-[#4345A6]"
                      type="text"
                      placeholder="Username"
                      name="username"
                      id="username"
                    />
                    <div className="flex flex-col gap-2.5">
                      <input
                        ref={passwordRef}
                        className="w-[18rem]md:w-[28rem] lg:w-[26rem] h-auto border-[#4345A6] border-2 text-[16px] text-[#ffffff] font-bold px-3 py-2 rounded-xl placeholder:text-[16px] outline-0 md:placeholder:text-xl placeholder:text-[#4345A6]"
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
                      <button className="text-[9.5px] md:text-[12px] text-white text-right mr-1.5 font-semibold m-0 p-0 cursor-pointer">
                        Forgot Password?
                      </button>
                    </div>
                    <button className="w-[18rem] md:w-[28rem] lg:w-[26rem] h-auto mt-3 bg-[#4345A6] text-[18px] md:text-xl text-[#ffffff] font-bold py-2 rounded-xl cursor-pointer">
                      Login
                    </button>
                  </form>
                )}

                <div className="flex gap-2.5 items-center justify-center mt-8 mb-2">
                  <button className="cursor-pointer">
                    <img
                      className="w-10 md:w-12 h-auto"
                      src={GoogleAl}
                      alt="Google Logo"
                    />
                  </button>
                  <button className="cursor-pointer">
                    <img
                      className="w-10 md:w-12 h-auto"
                      src={GithubAl}
                      alt="Github Logo"
                    />
                  </button>
                </div>
                {toregister ? (
                  <h3 className="text-[16px] text-white text-center">
                    Already have an account?{" "}
                    <span className="text-[#4345A6] text-[14px] cursor-pointer font-extrabold underline underline-offset-2 decoration-[#4345A6]">
                      <button
                        onClick={() => {
                          setToregister(false);
                        }}
                        className="cursor-pointer"
                      >
                        Sign In
                      </button>
                    </span>
                  </h3>
                ) : (
                  <h3 className="text-[16px] text-white text-center">
                    Dont have an account?{" "}
                    <span className="text-[#4345A6] text-[14px] cursor-pointer font-extrabold underline underline-offset-2 decoration-[#4345A6]">
                      <button
                        onClick={() => {
                          setToregister(true);
                          usernameRef.current!.value = "";
                          passwordRef.current!.value = "";
                          nameRef.current!.value = "";
                          emailRef.current!.value = "";
                          
                        }}
                        className="cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </span>
                  </h3>
                )}
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
      </div>
    </>
  );
};

export default Login;
