import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { UserAuth } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import WaterIcon from "@mui/icons-material/Water";

const MobBar = () => {
  const navigate = useNavigate();
  const { allProjects, setCurrentProject, isOpenSideBar } =
    useContext(AppContext);
  const [getPath, setGetPath] = useState("Home");
  const [pathActive, setPathActive] = useState(getPath);
  const [w, setW] = useState("");
  useEffect(() => {
    setPathActive(window.location.pathname);
  }, [getPath]);
  const handleNavigate = (path) => {
    setGetPath(path);
  };
  useLayoutEffect(() => {
    const wid = window.innerWidth;
    setW(wid);
  }, []);
  return (
    <div
      className={`md:hidden block z-50 absolute w-full h-full animate-slideIn top-[60px] dark:bg-[#2a213a] bg-slate-200`}
    >
      <div className=" flex flex-col gap-1 justify-start items-center my-2 mt-1">
        <Link
          onClick={() => {
            handleNavigate("/");
          }}
          to="/"
          className={`
                ${
                  pathActive === "/"
                    ? "color-Primary text-white"
                    : "text-black bg-white"
                }
                w-full dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300  `}
        >
          <LineAxisIcon sx={{ fontSize: 25 }} />
          <h1 className="text-lg">DashBoard</h1>
        </Link>
        <Link
          onClick={() => {
            handleNavigate("/management");
          }}
          to="/management"
          className={`
                ${
                  pathActive === "/management"
                    ? "text-white color-Primary"
                    : "text-black bg-white"
                }
                w-full dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300`}
        >
          <AddBoxIcon sx={{ fontSize: 30 }} />
          <h1 className="text-lg">Project Management</h1>
        </Link>

        <Link
          onClick={() => {
            handleNavigate("rainfall");
          }}
          to="/rainfall"
          className={`
                ${
                  pathActive === "/rainfall"
                    ? "color-Primary text-white"
                    : "text-black bg-white"
                }
                w-full dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300 `}
        >
          <WaterIcon sx={{ fontSize: 25 }} />
          <h1 className="text-lg">Rainfall Management</h1>
        </Link>
        <Link
          onClick={() => {
            handleNavigate("notifications");
          }}
          to="/notifications"
          className={`
                ${
                  pathActive === "/notifications"
                    ? "color-Primary text-white"
                    : "text-black bg-white"
                }
                w-full dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300`}
        >
          <NotificationImportantOutlinedIcon sx={{ fontSize: 25 }} />
          <h1 className="text-lg">Notifications</h1>
        </Link>
      </div>
    </div>
  );
};

export default MobBar;
