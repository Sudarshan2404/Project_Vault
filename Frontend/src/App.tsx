import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Err500 from "./pages/Error_pages/Err500.tsx";
import Profile from "./pages/Profile.tsx";

const App = () => {
  return (
    <Routes>
      {/* <Route element={<RedirectRoute />}> */}
      <Route path="/auth" element={<Login />} />
      {/* </Route> */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/500" element={<Err500 />} />
    </Routes>
  );
};

export default App;
