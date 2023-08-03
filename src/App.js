import DashBoard from "./pages/DashBoard";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import ProjectManagement from "./pages/ProjectManagement";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import RequiredAuth from "./requiredAuth/RequiredAuth";
import { useSelector } from "react-redux";
import { RainFall } from "./pages/RainFall";
import { Mapmanagement } from "./pages/Mapmanagement";

function App() {
  const userRedux = useSelector((state) => state);

  return (
    <Routes>
      <Route element={<RequiredAuth />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route exact path="/management" element={<ProjectManagement />} />
        <Route path="/rainfall" element={<RainFall />} />
        <Route path="/mapmanagement" element={<Mapmanagement />} />
        <Route
          path={`/user/${userRedux.user?.uid}`}
          element={<UserProfile />}
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
