import { useContext } from "react";
import Authcontext from "../context/authcontext.tsx";

const useAuth = () => {
  const context = useContext(Authcontext);

  if (!context) {
    throw new Error("The Auth context must be used");
  }

  return context;
};

export default useAuth;
