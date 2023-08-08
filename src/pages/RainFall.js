import React, { useContext, useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar.js/NavBar";
import Title from "../components/Header/Header";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import apiProjectService from "../services/ApiProjectService";
import { useSelector } from "react-redux";
import { RainFallChooseProject } from "../components/RainFall/RainFallChooseProject";
import { ToastContainer, toast } from "react-toast";
import { AllRainFall } from "../components/RainFall/AllRainFall";
import { RainFallDetail } from "../components/RainFall/RainFallDetail";
import { AppContext } from "../context/AppContext";
import MobBar from "../components/NavBar.js/MobBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";

import { AddnewFeed } from "../components/RainFall/AddnewFeed";
import { PopupDel } from "../components/CreateProjectComponents/PopupDel";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Sort } from "../components/RainFall/Sort";

export const RainFall = () => {
  const userRedux = useSelector((state) => state);
  const [isAddNew, setIsAddNew] = useState(false);
  const [isPostFeed, setIsPostFeed] = useState(false);
  const [threeDot, setThreeDot] = useState({});
  const { setIsOpenSideBar, isOpenSideBar, loadCreation } =
    useContext(AppContext);

  const [projectchose, setProjectChose] = useState({
    projectName: "Choose Project",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [loadAllRain, setLoadAllRain] = useState(false);
  const [chooseDetail, setChooseDetail] = useState("");
  const [postFeedDay, setPostFeedDay] = useState("");
  const [postFeedTime, setPostFeedTime] = useState("");
  const [popupDel, setPopupDel] = useState({ isPopup: false, data: {} });
  const [chooseDetailData, setChooseDetailData] = useState([]);
  const [espName, setEspName] = useState("");
  const nameRef = useRef(null);
  const postFeedRef = useRef();
  const handleSubmit = () => {
    const objChose = {
      espName: espName,
      pid: projectchose.pid,
      uid: userRedux.user?.uid,
    };
    if (objChose?.pid === undefined || objChose?.espName === "") {
      setAlert({ isOpen: true, message: "All fields required" });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } else {
      try {
        apiProjectService.post("/rain/newrain", objChose).then((res) => {
          setIsAddNew(false);
          setLoadAllRain(!loadAllRain);
          toast.success(`Create successfully!`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          });
        });
      } catch (error) {
        toast.error(`Something's wrong!`, {
          backgroundColor: "green",
          color: "#ffffff",
          position: "top-right",
          delay: 2000,
        });
      }
    }
  };
  const handleDeleteProject = (data) => {
    try {
      apiProjectService
        .put(`/rain/deleteAItemAtFeed`, {
          pid: chooseDetail,
          generated_date: data?.generated_date,
          field1: data?.field1,
        })
        .then((res) => {
          setPopupDel({ isPopup: false, data: {} });
          setLoadAllRain(!loadAllRain);
          toast.success(`${res.data}!`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          });
          setLoading(!loading);
        });
      setPopupDel({ isPopup: false, data: {} });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    setIsOpenSideBar(false);
  }, []);

  return (
    <DefaultLayout title={"Rainfall Station"}>
      {isOpenSideBar && <MobBar setIsOpenSideBar />}
      {isPostFeed && (
        <AddnewFeed
          loading={loading}
          setLoading={setLoading}
          setIsPostFeed={setIsPostFeed}
          isPostFeed={isPostFeed}
          postFeedRef={postFeedRef}
          postFeedDay={postFeedDay}
          setPostFeedDay={setPostFeedDay}
          setPostFeedTime={setPostFeedTime}
          postFeedTime={postFeedTime}
          loadAllRain={loadAllRain}
          setLoadAllRain={setLoadAllRain}
          chooseDetail={chooseDetail}
          setPopupDel={setPopupDel}
          popupDel={popupDel}
        />
      )}
      {popupDel?.isPopup && (
        <PopupDel
          setPopupDel={setPopupDel}
          handleDeleteProject={handleDeleteProject}
          popupDel={popupDel}
        />
      )}
      {isAddNew && (
        <div className="absolute top-0  w-full h-full flex items-center justify-center">
          <div
            onClick={() => setIsAddNew(false)}
            className="w-full h-full bg-black opacity-75 absolute top-0 z-40"
          />
          <div className="z-50 bg-white w-[400px] h-fit flex flex-col gap-2 dark:bg-[#2a213a]">
            <h1 className="p-4 text-white font-bold color-Primary m-4 mb-0">
              New Station
            </h1>
            <div className="animate-opacity w-full h-fit  p-4 flex flex-col gap-2">
              <RainFallChooseProject
                alert={alert}
                setProjectChose={setProjectChose}
                projectchose={projectchose}
              />
              <input
                defaultValue={espName}
                onChange={(e) => setEspName(e.target.value)}
                className={`outline-none rounded border-[1px] w-full p-4 px-4 bg-slate-100
                                ${
                                  alert?.isOpen
                                    ? "border-red-500"
                                    : "border-slate-00"
                                }
                            `}
                placeholder="Enter new name"
                alt=""
              />
            </div>
            <div className="flex items-center justify-end gap-2 p-4">
              <button
                onClick={() => setIsAddNew(!isAddNew)}
                className="p-2 flex items-center dark:text-white text-slate-900 border-[1px] border-slate-300 rounded px-4"
              >
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSubmit}
                className="p-2 flex items-center color-Primary text-white rounded px-4"
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full animate-slideInToLeft md:animate-opacity">
        <div className="w-full relative h-full p-2 bg-[#f2f2f2]  dark:bg-slate-900">
          {chooseDetail !== "" && (
            <div
              onClick={() => setChooseDetail("")}
              className="absolute z-30 top-0 left-0 w-full h-full bg-black opacity-75"
            />
          )}
          <div className="w-full  lightShadow h-fit py-4 bg-white rounded flex md:flex-row flex-col dark:bg-[#2a213a] md:gap-0 gap-2">
            <div className="md:block hidden animate-slideIn dark:bg-[#2a213a] rounded w-full h-fit border-r-[1px] border-slate-300 overflow-hidden">
              <div className="p-4 pb-0">
                <button
                  onClick={() => {
                    setIsAddNew(!isAddNew);
                    setThreeDot({
                      isPopup: false,
                      index: undefined,
                    });
                  }}
                  className="p-2 flex items-center color-Primary text-white rounded px-4"
                >
                  <AddIcon />
                  <span>New Rain Station</span>
                </button>
              </div>
              <div className="relative overflow-scroll h-fit scrollbar animate-slideDown">
                <div className="p-4 animate-opacity">
                  <div className="flex items-center rounded border-[1px] border-slate-300 w-fit px-4 gap-2">
                    <SearchIcon />
                    <input
                      className="outline-none p-2 w-[400px] italic"
                      placeholder="Enter your Rain station"
                      alt=""
                    />
                  </div>
                </div>

                <AllRainFall
                  chooseDetail={chooseDetail}
                  setChooseDetail={setChooseDetail}
                  loadAllRain={loadAllRain}
                  loadCreation={loadCreation}
                />
              </div>
            </div>
            {chooseDetail !== "" && (
              <div className="z-40 absolute top-0 right-0 w-2/3 p-2 h-full">
                <div className="md:block rounded animate-slideInToLeft hidden  white dark:bg-[#2a213a] bg-white w-full h-1/2 md:h-full pb-10 overflow-auto scrollbar">
                  <>
                    <div className="z-40 p-4 flex justify-between sticky left-0 top-0 bg-white dark:bg-[#2a213a]">
                      <Sort />

                      <button
                        onClick={() => {
                          setIsPostFeed(!isPostFeed);
                          setThreeDot({
                            isPopup: false,
                            index: undefined,
                          });
                        }}
                        className="p-2 flex items-center color-Primary text-white rounded px-4"
                      >
                        <AddIcon />
                        <span>New</span>
                      </button>
                    </div>
                    <div className="w-full md:overflow-visible h-[calc(100%-74px)] p-4 pt-0 flex flex-col gap-2">
                      <RainFallDetail
                        loading={loading}
                        setChooseDetailData={setChooseDetailData}
                        chooseDetailData={chooseDetailData}
                        setIsAddNew={setIsAddNew}
                        setThreeDot={setThreeDot}
                        threeDot={threeDot}
                        setPopupDel={setPopupDel}
                        loadAllRain={loadAllRain}
                        chooseDetail={chooseDetail}
                      />
                    </div>
                  </>
                </div>
              </div>
            )}

            {chooseDetail === "" ? (
              <div className=" animate-slideIn md:hidden block bg-white dark:bg-[#2a213a] rounded w-full md:w-1/5 h-1/2 md:h-full border-r-[1px] border-slate-300 overflow-hidden">
                <div className="p-4">
                  {isAddNew ? (
                    <div className="w-full flex gap-2 items-center justify-start">
                      <button
                        onClick={handleSubmit}
                        className="p-2 flex items-center color-Primary text-white rounded px-4"
                      >
                        <span>Submit</span>
                      </button>
                      <button
                        onClick={() => setIsAddNew(!isAddNew)}
                        className="p-2 flex items-center dark:text-white text-slate-900 border-[1px] border-slate-300 rounded px-4"
                      >
                        <span>Cancel</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAddNew(!isAddNew);
                        setThreeDot({
                          isPopup: false,
                          index: undefined,
                        });
                      }}
                      className="p-2 flex items-center color-Primary text-white rounded px-4"
                    >
                      <AddIcon />
                      <span>New Rain Station</span>
                    </button>
                  )}
                </div>
                <div className="relative overflow-scroll h-full scrollbar">
                  {isAddNew && (
                    <div className="animate-opacity absolute w-full h-full dark:bg-[#2a213a] bg-white p-4 py-0 flex flex-col gap-2">
                      <RainFallChooseProject
                        alert={alert}
                        setProjectChose={setProjectChose}
                        projectchose={projectchose}
                      />
                      <input
                        ref={nameRef}
                        className={`outline-none rounded border-[1px] w-full p-4 px-4 bg-slate-100
                                ${
                                  alert?.isOpen
                                    ? "border-red-500"
                                    : "border-slate-00"
                                }
                            `}
                        placeholder="Enter new name"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="p-4 py-0 animate-opacity">
                    <input
                      className="outline-none rounded border-[1px] border-slate-300 p-4  bg-slate-100 w-full"
                      placeholder="Enter your Rain station"
                      alt=""
                    />
                  </div>
                  <AllRainFall
                    chooseDetail={chooseDetail}
                    setChooseDetail={setChooseDetail}
                    loadAllRain={loadAllRain}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="animate-slideInToLeft md:hidden block relative w-full md:w-3/5 bg-white dark:bg-[#2a213a] h-full pb-10 overflow-auto scrollbar">
                  <div className="p-4 flex justify-between sticky left-0 top-0 bg-white dark:bg-[#2a213a]">
                    <div
                      onClick={() => setChooseDetail("")}
                      className="flex items-center gap-2 text-blue-500 p-2 rounded hover:bg-slate-100 cursor-pointer"
                    >
                      <ArrowBackIcon /> <span>Back</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsPostFeed(!isPostFeed);
                        setThreeDot({
                          isPopup: false,
                          index: undefined,
                        });
                      }}
                      className="p-2 flex items-center color-Primary text-white rounded px-4 "
                    >
                      <AddIcon />
                      <span>New</span>
                    </button>
                  </div>
                  <div className="w-full md:overflow-visible h-[calc(100%-74px)] p-4">
                    <RainFallDetail
                      setIsAddNew={setIsAddNew}
                      setThreeDot={setThreeDot}
                      threeDot={threeDot}
                      setPopupDel={setPopupDel}
                      loadAllRain={loadAllRain}
                      chooseDetail={chooseDetail}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
