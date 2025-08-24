import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authcontext.tsx";
// import CheckBc from "./routes/checkBc.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* <CheckBc> */}
        <App />
        {/* </CheckBc> */}
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
