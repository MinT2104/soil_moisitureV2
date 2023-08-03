import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import WaterIcon from "@mui/icons-material/Water";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import MapIcon from "@mui/icons-material/Map";

import moment from "moment";

const NavBar = ({ setIsChooseMapPopup }) => {
  const { setLoadCreation, loadCreation } = useContext(AppContext);
  const [getPath, setGetPath] = useState("");
  const [pathActive, setPathActive] = useState(getPath);

  useEffect(() => {
    setPathActive(window.location.pathname);
  }, [getPath]);

  return (
    <div className="animate-none dark:bg-[#2a213a] dark:text-white md:flex flex-col justify-between bg-white w-[100px] h-full p-4 z-0 hidden">
      <div>
        <div className="z-0 flex flex-col gap-2 justify-center items-center my-4">
          <Link
            onClick={() => {
              setGetPath("/");
            }}
            to="/"
            className={`
                ${
                  pathActive === "/" ? "color-Primary text-white" : "text-black"
                }
                w-fit dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300 cursor-pointer `}
          >
            <LineAxisIcon sx={{ fontSize: 25 }} />
            {/* <h1 className='text-lg'>DashBoard</h1> */}
          </Link>
          <Link
            onClick={() => {
              setGetPath("/management");
              setLoadCreation(!loadCreation);
            }}
            to="/management"
            className={`
                ${
                  pathActive === "/management"
                    ? "color-Primary text-white"
                    : "text-black"
                }
                w-fit dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300 cursor-pointer `}
          >
            <AddBoxIcon sx={{ fontSize: 25 }} />
            {/* <h1 className='text-lg'>Create</h1> */}
          </Link>

          <Link
            onClick={() => {
              setGetPath("mapmanagement");
            }}
            to="/mapmanagement"
            className={`
                ${
                  pathActive === "/mapmanagement"
                    ? "color-Primary text-white"
                    : "text-black"
                }
                w-fit dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300 cursor-pointer `}
          >
            <MapIcon sx={{ fontSize: 25 }} />
          </Link>
          <Link
            onClick={() => {
              setGetPath("rainfall");
            }}
            to="/rainfall"
            className={`
                ${
                  pathActive === "/rainfall"
                    ? "color-Primary text-white"
                    : "text-black"
                }
                w-fit dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300 cursor-pointer `}
          >
            <WaterIcon sx={{ fontSize: 25 }} />
            {/* <h1 className='text-lg'>DashBoard</h1> */}
          </Link>
          <Link
            onClick={() => {
              setGetPath("notifications");
            }}
            to="/notifications"
            className={`
                ${
                  pathActive === "/notifications"
                    ? "color-Primary text-white"
                    : "text-black"
                }
                w-fit dark:bg-transparent dark:text-white outline-none font-normal flex items-bottom gap-4 hover:color-Primary hover:text-white rounded p-4 hover:translate-x-1 duration-300 cursor-pointer `}
          >
            <NotificationImportantOutlinedIcon sx={{ fontSize: 25 }} />
            {/* <h1 className='text-lg'>Notifications</h1> */}
          </Link>
        </div>
      </div>
      <div className=" w-full h-16 color-Primary rounded p-1">
        <div className="w-full h-full flex flex-col justify-start items-center">
          <span className="text-md font-bold text-white">
            {moment(Date()).format("MMM")}
          </span>
          <span className="text-sm font-light text-white">
            {moment(Date()).format("DD")}
          </span>
        </div>
        {/* <div className='w-full h-1/3 bg-white rounded flex items-center justify-center'>
                    <span className='text-[12px] font-extralight text-orange-600'>
                    {time}
                    </span>
                </div> */}
      </div>
    </div>
  );
};
export default NavBar;
