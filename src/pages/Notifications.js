import NavBar from "../components/NavBar.js/NavBar";
import MobBar from "../components/NavBar.js/MobBar";
import PopupModalMessage from "../components/notificationsComponents/PopupModalMessage";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import apiProjectService from "../services/ApiProjectService";
import { useSelector } from "react-redux";
import ChooseNotiProject from "../components/notificationsComponents/ChooseNotiProject";
import ListNoti from "../components/notificationsComponents/ListNoti";
import moment from "moment";
import IsRead from "../components/notificationsComponents/IsRead";
import { toast } from "react-toast";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { DefaultLayout } from "../layouts/DefaultLayout";

const Notifications = () => {
  const userRedux = useSelector((state) => state);
  const { setProjectChose, projectchose, setIsOpenSideBar, isOpenSideBar } =
    useContext(AppContext);
  const [load, setLoad] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isFilterCheckbox, setIsFilterCheckbox] = useState(false);
  const [isOpenChooseProject, setIsOpenChooseProject] = useState(false);
  const [isOpenChooseDay, setIsOpenChooseDay] = useState(false);
  const [readChoose, setReadChoose] = useState("Read");
  const [value, setValue] = useState(dayjs(new Date()));
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  let checkedlist = [];
  const [checkList, setCheckList] = useState([]);
  const [filterObject, setFilterObject] = useState();
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
  });
  const [filterItems, setFilterItems] = useState([]);
  const [errObj, setErrObj] = useState({});
  const handleShowFilterCheckbox = () => {
    setIsFilterCheckbox(!isFilterCheckbox);
  };
  useEffect(() => {
    const getData = async () => {
      const data = await apiProjectService.post(`/noti/getusernoti`, {
        uid: userRedux.user?.uid,
      });
      setUserData(data.data);
    };
    getData();
  }, [load]);

  const handAllchecked = (e) => {
    setCheckList([]);
    const listElement = document.getElementsByTagName("input");

    if (e.target.checked) {
      for (let i = 1; i < listElement.length - 1; i++) {
        setCheckList((prev) => [...prev, listElement[i].id]);
        listElement[i].checked = true;
      }
    } else {
      for (let i = 1; i < listElement.length - 1; i++) {
        checkedlist = [];
        listElement[i].checked = false;
      }
    }
  };
  const handAllchecked_v2 = () => {
    setCheckList([]);
    const listElement = document.getElementsByTagName("input");
    listElement[0].checked = true;

    for (let i = 1; i < listElement.length - 1; i++) {
      setCheckList((prev) => [...prev, listElement[i].id]);
      listElement[i].checked = true;
    }
  };
  const handUnAllchecked = () => {
    setCheckList([]);
    const listElement = document.getElementsByTagName("input");
    for (let i = 0; i < listElement.length - 1; i++) {
      listElement[i].checked = false;
    }
  };
  const handleDelete = () => {
    const objDelete = {
      uid: userRedux?.user.uid,
      created_at: checkList,
    };
    console.log(objDelete);
    try {
      apiProjectService
        .put(`/noti/delete`, {
          uid: userRedux?.user.uid,
          created_at: checkList,
        })
        .then((res) => {
          toast.success(`${res.data}`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          });
          setLoad(!load);
          const listElement = document.getElementsByTagName("input");
          for (let i = 0; i < listElement.length - 1; i++) {
            listElement[i].checked = false;
          }
        })
        .catch((error) =>
          toast.error(`Somethings wrong!`, {
            backgroundColor: "red",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseRead = (event) => {
    setReadChoose(event.target.value);
  };
  const handleRefresh = () => {
    setLoad(!load);
  };

  const handleApply = () => {
    if (projectchose === "Choose Project" || readChoose === "Read") {
      setErrObj({ isOpen: true, message: "All fields is required" });
      setTimeout(() => {
        setErrObj({ isOpen: false, message: "" });
      }, 3000);
    } else {
      let readChooseValue = "";
      if (readChoose === "Yes") readChooseValue = true;
      if (readChoose === "No") readChooseValue = false;
      if (readChoose === "All") readChooseValue = "All";
      const applyObject = {
        pid: projectchose.pid || "All",
        isRead: readChooseValue,
        day: dayjs(value.$d).format("DD/MM/YYYY"),
      };
      setFilterObject(applyObject);
      setIsOpenFilter(false);
    }
  };
  const muiCustomElememt = document.getElementsByClassName("MuiSvgIcon-root");
  if (localStorage.getItem("dark") === "true") {
    muiCustomElememt[15]?.firstChild?.setAttribute("fill", "gray");
  } else {
    muiCustomElememt[15]?.firstChild?.setAttribute("fill", "gray");
  }
  useEffect(() => {
    setIsOpenSideBar(false);
  }, []);
  return (
    <DefaultLayout title={"My Notifications"}>
      {isOpenSideBar && <MobBar setIsOpenSideBar />}
      <PopupModalMessage
        modalMessage={modalMessage}
        setModalMessage={setModalMessage}
      />
      <div className="w-full h-full flex flex-col animate-slideInToLeft md:animate-opacity">
        <div className="dark:bg-slate-900 w-full h-full createBg flex items-center justify-center md:p-1">
          <div className="relative dark:bg-[#2a213a] font-bold bg-white text-black w-full h-full mt-[1px] md:mt-0 shadow-sm  md:p-4 flex">
            <div className="w-full md:w-2/3 h-full  p-1 rounded dark:bg-[#2a213a]">
              <div className="dark:bg-[#2a213a] dark:text-white relative w-full pl-5 pr-1 py-2 flex items-center justify-start">
                {isFilterCheckbox && (
                  <div className="shadow-main absolute top-10 left-9 w-40 h-fit rounded bg-white p-1 flex flex-col gap-1">
                    <div
                      onClick={() => {
                        handAllchecked_v2();
                        setIsFilterCheckbox(false);
                      }}
                      className="font-light bg-white px-2 rounded cursor-pointer hover:bg-gray-200 duration-300"
                    >
                      Tất cả
                    </div>
                    <div
                      onClick={() => {
                        handUnAllchecked();
                        setIsFilterCheckbox(false);
                      }}
                      className="font-light bg-white px-2 rounded cursor-pointer hover:bg-gray-200 duration-300"
                    >
                      Bỏ chọn tất cả
                    </div>
                    <div className="font-light bg-white px-2 rounded cursor-pointer hover:bg-gray-200 duration-300">
                      Thư chưa đọc
                    </div>
                    <div className="font-light bg-white px-2 rounded cursor-pointer hover:bg-gray-200 duration-300">
                      Thư đã đọc
                    </div>
                  </div>
                )}
                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center">
                    <div className="flex items-center ">
                      <input
                        onClick={handAllchecked}
                        type="checkbox"
                        className="hover:bg-gray-300 duration-500"
                      />
                      <ArrowDropDownIcon
                        onClick={handleShowFilterCheckbox}
                        className="hover:bg-gray-300 duration-500 cursor-pointer"
                        sx={{ fontSize: 20 }}
                      />
                    </div>
                    <RefreshIcon
                      onClick={handleRefresh}
                      sx={{ fontSize: 20 }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <span
                      onClick={() => {
                        setIsOpenFilter(true);
                      }}
                      className="flex items-center md:hidden "
                    >
                      <FilterAltOutlinedIcon />
                    </span>
                    <button
                      className={`${
                        checkList.length === 0
                          ? "bg-gray-300 dark:text-gray-100 cursor-default"
                          : "color-Primary dark:text-white cursor-pointer"
                      } p-2 px- rounded text-white font-bold `}
                      disabled={checkList.length === 0 ? true : false}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <ListNoti
                setErrObj={setErrObj}
                setFilterItems={setFilterItems}
                filterItems={filterItems}
                setLoad={setLoad}
                setModalMessage={setModalMessage}
                load={load}
                filterObject={filterObject}
                setCheckList={setCheckList}
                checkList={checkList}
                userData={userData}
              />
            </div>
            {isOpenFilter && (
              <div className="animate-opacity dark:bg-[#2a213a] md:hidden dark:text-white w-full text-black absolute h-full p-1 px-2 flex flex-col justify-start bg-white">
                <div
                  onClick={() => {
                    setIsOpenFilter(false);
                  }}
                  className="flex items-center gap-2 text-blue-500 p-4 rounded hover:bg-slate-100 cursor-pointer"
                >
                  <ArrowBackIcon /> <span>Back</span>
                </div>
                <div className="w-full flex gap-2 flex-col">
                  <div className="w-full p-2 border-[0.5px] border-gray-400 rounded flex items-center justify-center color-Primary">
                    <span className="font-bold tracking-widest inline-block  text-white p-2">
                      FILTER
                    </span>
                  </div>
                  <hr className="w-2/3 mx-auto mt-5 mb-3" />
                  <ChooseNotiProject
                    userData={userData}
                    setIsOpenChooseDay={setIsOpenChooseDay}
                    setIsOpenChooseProject={setIsOpenChooseProject}
                    isOpenChooseProject={isOpenChooseProject}
                    setProjectChose={setProjectChose}
                    projectchose={projectchose}
                    errObj={errObj}
                  />

                  {/* ------------------------------ */}
                  <IsRead
                    handleChoose={handleChooseRead}
                    setIsOpenChooseProject={setIsOpenChooseProject}
                    setIsOpenChooseDay={setIsOpenChooseDay}
                    isOpenChooseDay={isOpenChooseDay}
                    setReadChoose={setReadChoose}
                    readChoose={readChoose}
                    errObj={errObj}
                  />

                  {/* ------------------------------------------------------- */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ justifyContent: "left" }}
                      components={["DatePicker", "DatePicker"]}
                    >
                      <DatePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        label={"Year - Month - Day"}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {errObj?.isOpen && (
                    <div className="w-2/3 py-4 bg-orange-100 rounded mx-auto text-red-500 my-10 flex items-center justify-center border-red-500 border-[1px]">
                      <span>{errObj?.message}</span>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    id="applyBtn"
                    onClick={handleApply}
                    className="py-3 rounded text-white w-full color-Primary mt-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            <div className="dark:bg-[#2a213a] dark:text-white w-1/3 hidden h-full p-1 px-2 md:flex flex-col justify-between bg-white">
              <div className="w-full flex gap-2 flex-col">
                <div className="w-full p-2 border-[0.5px] border-gray-400 rounded flex items-center justify-center color-Primary">
                  <span className="font-bold tracking-widest inline-block  text-white p-2">
                    FILTER
                  </span>
                </div>
                <hr className="w-2/3 mx-auto mt-5 mb-3" />
                <ChooseNotiProject
                  userData={userData}
                  setIsOpenChooseDay={setIsOpenChooseDay}
                  setIsOpenChooseProject={setIsOpenChooseProject}
                  isOpenChooseProject={isOpenChooseProject}
                  setProjectChose={setProjectChose}
                  projectchose={projectchose}
                  errObj={errObj}
                />

                {/* ------------------------------ */}
                <IsRead
                  handleChoose={handleChooseRead}
                  setIsOpenChooseProject={setIsOpenChooseProject}
                  setIsOpenChooseDay={setIsOpenChooseDay}
                  isOpenChooseDay={isOpenChooseDay}
                  setReadChoose={setReadChoose}
                  readChoose={readChoose}
                  errObj={errObj}
                />

                {/* ------------------------------------------------------- */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ justifyContent: "left" }}
                    components={["DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      label={"Year - Month - Day"}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errObj?.isOpen && (
                  <div className="w-2/3 py-4 bg-orange-100 rounded mx-auto text-red-500 my-10 flex items-center justify-center border-red-500 border-[1px]">
                    <span>{errObj?.message}</span>
                  </div>
                )}
              </div>

              <div>
                <button
                  id="applyBtn"
                  onClick={handleApply}
                  className="py-3 rounded text-white w-full color-Primary"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Notifications;
