import InputFilter from "../DashboardComponents/InputFilter";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { AppContext } from "../../context/AppContext";
import { logout, logoutGoogle } from "../../redux/reducer/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toast";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import { useContext, useEffect, useState, useRef } from "react";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/img/logo.png";
import { useClickOutside } from "../../hooks/useClickOutside";
import { setCurrentProject } from "../../redux/reducer/currentProjectSlice";

const Header = (props) => {
  const navigate = useNavigate();
  const dropDownRef = useRef(null);
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state);
  const { setAllSenSorValue } = useContext(AppContext);
  const [isPopupUser, setIsPopupUser] = useState(false);
  const [dark, setDark] = useState("false");

  useEffect(() => {
    setDark(localStorage.getItem("dark"));
    if (localStorage.getItem("dark") === "true") {
      document.getElementsByTagName("html")[0].classList.add("dark");
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
    }
  });

  const handleLogOut = () => {
    if (userRedux.user?.providerId) {
      dispatch(setCurrentProject({}));
      dispatch(logoutGoogle());
      navigate("/login");
    } else {
      dispatch(logout());
      navigate("/login");
      dispatch(setCurrentProject({}));
      setAllSenSorValue([]);
    }
    setTimeout(() => {
      toast.success("Log out successfully!", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
        position: "top-right",
        delay: 2000,
      });
    }, 1000);
  };
  if (localStorage.getItem("dark") === "true") {
    for (
      let i = 0;
      i <
      document.getElementsByClassName(
        "css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root"
      ).length;
      i++
    ) {
      document
        .getElementsByClassName(
          "css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root"
        )
        [i].setAttribute("style", "color:white;");
    }
    for (
      let i = 0;
      i <
      document.getElementsByClassName(
        "css-1sumxir-MuiFormLabel-root-MuiInputLabel-root"
      ).length;
      i++
    ) {
      document
        .getElementsByClassName(
          "css-1sumxir-MuiFormLabel-root-MuiInputLabel-root"
        )
        [i].setAttribute("style", "color:white;");
    }
    for (
      let i = 0;
      i <
      document.getElementsByClassName(
        "css-1d3z3hw-MuiOutlinedInput-notchedOutline"
      ).length;
      i++
    ) {
      document
        .getElementsByClassName("css-1d3z3hw-MuiOutlinedInput-notchedOutline")
        [i].setAttribute("style", "border-color:white;");
    }
    // for(let i=0;i< document.getElementsByClassName("MuiSvgIcon-root").firstChild.length ;i++){
    //     // document.getElementsByClassName("MuiSvgIcon-root ").firstChild[i].setAttribute("fill","white")
    // }
    // document.getElementsByClassName
    document
      .getElementsByClassName("MuiSvgIcon-root")[11]
      ?.firstChild?.setAttribute("fill", "white");
    document
      .getElementsByClassName("MuiSvgIcon-root")[12]
      ?.firstChild?.setAttribute("fill", "white");
  } else {
    for (
      let i = 0;
      i <
      document.getElementsByClassName(
        "css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root"
      ).length;
      i++
    ) {
      document
        .getElementsByClassName(
          "css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root"
        )
        [i].removeAttribute("style");
    }
    for (
      let i = 0;
      i <
      document.getElementsByClassName(
        "css-1sumxir-MuiFormLabel-root-MuiInputLabel-root"
      ).length;
      i++
    ) {
      document
        .getElementsByClassName(
          "css-1sumxir-MuiFormLabel-root-MuiInputLabel-root"
        )
        [i].removeAttribute("style");
    }
    for (
      let i = 0;
      i <
      document.getElementsByClassName(
        "css-1d3z3hw-MuiOutlinedInput-notchedOutline"
      ).length;
      i++
    ) {
      document
        .getElementsByClassName("css-1d3z3hw-MuiOutlinedInput-notchedOutline")
        [i].removeAttribute("style");
    }
    document
      .getElementsByClassName("MuiSvgIcon-root")[11]
      ?.firstChild?.removeAttribute("fill");
    document
      .getElementsByClassName("MuiSvgIcon-root")[12]
      ?.firstChild?.removeAttribute("fill");
  }
  const handelOpenDarkMode = () => {
    localStorage.setItem("dark", "true");
    setDark("true");
    // document.getElementsByTagName("html")
    document.getElementsByTagName("html")[0].classList?.add("dark");
  };
  const handelCloseDarkMode = () => {
    localStorage.setItem("dark", "false");
    setDark("false");
    // document.getElementsByTagName("html")
    document.getElementsByTagName("html")[0].classList?.remove("dark");
  };
  const handleOpenSideBar = () => {
    props.setIsOpenSideBar(true);
    setIsPopupUser(false);
  };

  useClickOutside(dropDownRef, setIsPopupUser);

  return (
    <div className="relative animate-cancel  dark:bg-[#2a213a] dark:text-white shadow-xl px-2 md:px-10 md:pl-6 w-full h-[60px] py-4 bg-white flex justify-between items-center text-black font-bold">
      {window.location.pathname.slice(1, 5) === "user" ? (
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-500 p-2 rounded hover:bg-slate-100 cursor-pointer"
        >
          <ArrowBackIcon /> <span>Back</span>
        </div>
      ) : (
        <div className="flex gap-10 items-center w-1/3">
          {!props.isOpenSideBar ? (
            <div className="md:hidden block" onClick={handleOpenSideBar}>
              <MenuIcon sx={{ fontSize: 30 }} />
            </div>
          ) : (
            <div
              onClick={() => {
                props.setIsOpenSideBar(false);
              }}
              className="md:hidden flex items-center gap-2 text-blue-500 p-2 rounded hover:bg-slate-100 cursor-pointer"
            >
              <ArrowBackIcon /> <span>Back</span>
            </div>
          )}
          <div
            onClick={() => navigate("/")}
            className="md:flex cursor-pointer hidden text-3xl z-0 outline-none font-black flex-row rounded items-center justify-center"
          >
            <div className="w-fit h-fit truncate cursor">
              <img src={logo} className="h-5" alt="" />
            </div>
          </div>
          <div className="md:flex hidden flex-col">
            <span className="text-[14px] md:text-[16px]">{props?.title}</span>
            <span className="font-light text-[10px] md:text-sm">
              Welcome back {userRedux.user?.displayName}!
            </span>
          </div>
        </div>
      )}

      <div className="md:hidden flex flex-col w-full items-center justify-center">
        <span className="text-[14px] md:text-[16px]">{props?.title}</span>
        <span className="font-light text-[10px] md:text-sm">
          Welcome back {userRedux.user?.displayName}!
        </span>
      </div>

      <div className="text-3xl outline-none h-full font-black flex flex-row rounded items-center justify-center gap-4">
        <Link className="md:block hidden" to="/notifications">
          <div className="p-2 rounded-full dark:bg-black bg-slate-200 h-[35px] w-[35px] flex items-center justify-center cursor-pointer">
            <NotificationImportantIcon sx={{ fontSize: 30 }} />
          </div>
        </Link>
        <div className="md:flex p-2 rounded-full dark:bg-black bg-slate-200 h-[35px] w-[35px] hidden items-center cursor-pointer justify-center">
          {dark === "true" ? (
            <DarkModeIcon
              onClick={handelCloseDarkMode}
              sx={{ color: "orange", fontSize: 30 }}
            />
          ) : (
            <LightModeIcon
              onClick={handelOpenDarkMode}
              sx={{ color: "red", fontSize: 30 }}
            />
          )}
        </div>
        <div
          ref={dropDownRef}
          className="relative flex items-center cursor-pointer "
        >
          {isPopupUser && (
            <div className=" dark:text-white dark:bg-[#2a213a] animate-opacity w-60 h-fit bg-white absolute top-[60px] -left-[160px] z-50 rounded strongShadow pb-2">
              <div className="p-2 px-4 cursor-default">
                <h1 className="text-lg font-light">
                  Sign in as{" "}
                  <span className="font-bold">
                    {userRedux.user?.displayName}
                  </span>
                </h1>
              </div>
              <hr />
              {dark === "true" ? (
                <div
                  className="px-4 py-2 flex gap-2 items-center"
                  onClick={handelCloseDarkMode}
                >
                  <DarkModeIcon sx={{ color: "orange", fontSize: 20 }} />
                  <h1 className="font-light text-sm"> Darkmode</h1>
                </div>
              ) : (
                <div
                  className="px-4 py-2 flex gap-2 items-center"
                  onClick={handelOpenDarkMode}
                >
                  <LightModeIcon sx={{ color: "red", fontSize: 20 }} />
                  <h1 className="font-light text-sm"> Darkmode</h1>
                </div>
              )}
              <hr />
              <div>
                <ul>
                  <li
                    onClick={() => setIsPopupUser(false)}
                    className="p-2 px-4 hover:bg-slate-200 dark:hover:text-black"
                  >
                    <Link
                      className="flex gap-2"
                      to={`/user/${userRedux.user?.uid}`}
                    >
                      <PersonIcon sx={{ fontSize: 20 }} />
                      <h1 className="font-light text-sm"> Your Profile</h1>
                    </Link>
                  </li>
                  <li
                    onClick={() => setIsPopupUser(false)}
                    className="p-2 px-4 hover:bg-slate-200 dark:hover:text-black"
                  >
                    <Link className="flex gap-2" to="/management">
                      <CollectionsBookmarkIcon sx={{ fontSize: 20 }} />
                      <h1 className="font-light text-sm"> Your project</h1>
                    </Link>
                  </li>
                  <li
                    onClick={() => setIsPopupUser(false)}
                    className="p-2 px-4 hover:bg-slate-200 dark:hover:text-black"
                  >
                    <Link className="flex gap-2" to="/notifications">
                      <NotificationImportantIcon sx={{ fontSize: 20 }} />
                      <h1 className="font-light text-sm">Notifications</h1>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <ul>
                  <li
                    onClick={() => setIsPopupUser(false)}
                    className="p-2 px-4 flex gap-2 hover:bg-slate-200 dark:hover:text-black"
                  >
                    <HelpIcon
                      sx={{ fontSize: 20 }}
                      className="dark:hover:text-black"
                    />
                    <h1 className="font-light text-sm">Help</h1>
                  </li>
                  <li
                    onClick={() => setIsPopupUser(false)}
                    className="p-2 px-4 hover:bg-slate-200 dark:hover:text-black"
                  >
                    <Link className="flex gap-2" to="#">
                      <SettingsIcon
                        onClick={() => {
                          toast.warn("This feature isn't available!", {
                            backgroundColor: "orange",
                            color: "#ffffff",
                            position: "top-right",
                            delay: 2000,
                          });
                        }}
                        className="dark:hover:text-black"
                        sx={{ fontSize: 20 }}
                      />
                      <h1 className="font-light text-sm">Settings</h1>
                    </Link>
                  </li>
                </ul>
              </div>
              <hr />
              <div
                onClick={handleLogOut}
                className="flex px-4 p-2 gap-2 hover:bg-slate-200 dark:hover:text-black"
              >
                <LogoutIcon sx={{ fontSize: 20 }} />
                <h1 className="text-sm font-light">Log Out</h1>
              </div>
            </div>
          )}
          <div
            onClick={() => {
              setIsPopupUser(!isPopupUser);
              props.setIsOpenSideBar(false);
            }}
            className="flex items-center ml-4"
          >
            <div className="w-[40px] h-[40px] rounded-full truncate cursor-pointer border-[2px] border-blue-500">
              <Link>
                <img src={userRedux.user?.photoURL} alt="" />
              </Link>
            </div>
            <ArrowDropDownIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
