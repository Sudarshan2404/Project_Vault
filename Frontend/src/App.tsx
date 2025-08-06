import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
