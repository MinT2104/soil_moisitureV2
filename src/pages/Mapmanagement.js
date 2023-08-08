import React, { useState, useMemo, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import NavBar from "../components/NavBar.js/NavBar";
import MobBar from "../components/NavBar.js/MobBar";
import MapConfig from "../components/DashboardComponents/MapConfig";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chart from "../components/DashboardComponents/Chart";
import moment from "moment";
import DatePickerValue from "../components/ChooseDays/ChooseDays";
import RainFallChart from "../components/Chart/RainFallChart";
import { FilterForChart } from "../utils/FilterForChart";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { initialViewPort } from "../constant/initialViewPort";
export const Mapmanagement = () => {
  const {
    isOpenSideBar,
    setIsOpenSideBar,
    allProjects,
    setReFreshChart,
    reFreshChart,
    dayObjectChosen,
    allSenSorValue,
    currentProject,
  } = useContext(AppContext);
  const [isOpenChart, setIsOpenChart] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState({});
  const [loadMap, setLoadMap] = useState(false);
  const [initialIndex, setInitialIndex] = useState({});
  const [viewport, setViewport] = useState(initialViewPort);

  //----------------date filter------------------

  // const filterDateTime = useMemo(() => {
  //   return FilterForChart(
  //     dayObjectChosen,
  //     initialIndex,
  //     currentProject,
  //     allSenSorValue
  //   );
  // }, [dayObjectChosen, initialIndex]);

  // const {
  //   initialValueCreated,
  //   initialValueField1,
  //   initialValueField2,
  //   filteredObjectCreated,
  //   filteredObjectField1,
  //   filteredObjectField2,
  //   valueCreate,
  //   valueField1,
  //   valueField2,
  // } = filterDateTime;
  //----------------------------------------------

  return (
    <DefaultLayout title={"Map Management"}>
      {isOpenChart && (
        <div className=" absolute w-full h-fit py-10 flex items-center justify-center flex-col">
          <div
            onClick={() => setIsOpenChart(false)}
            className="absolute w-full h-full bg-black opacity-80 z-30"
          ></div>
          <div className="z-50 bg-white w-4/5">
            <DatePickerValue />
          </div>
          <div className=" dark:bg-[#2a213a] bg-white dark:text-white shadow-xl animate-opacity h-fit w-4/5 md:block hidden">
            <div className=" dark:bg-[#2a213a]  relative dark:text-white scrollbar w-full  h-full bg-white  ">
              <div
                onClick={() => setReFreshChart(!reFreshChart)}
                className="cursor-pointer absolute top-0 z-50 right-2 p-1 color-Primary rounded text-white"
              >
                <RefreshIcon sx={{ fontSize: 30 }} />
              </div>
              <Chart />
            </div>
          </div>
          <div className="mt-5 dark:bg-[#2a213a] bg-white dark:text-white shadow-xl animate-opacity h-fit w-4/5 md:block hidden">
            <div className=" dark:bg-[#2a213a]  relative dark:text-white scrollbar w-full  h-full bg-white">
              <div
                onClick={() => setReFreshChart(!reFreshChart)}
                className="cursor-pointer absolute top-2 right-2  z-50 p-1 color-Primary rounded text-white"
              >
                <RefreshIcon sx={{ fontSize: 30 }} />
              </div>
              <RainFallChart />
            </div>
          </div>
        </div>
      )}
      {isOpenSideBar && <MobBar isOpenSideBar={isOpenSideBar} />}
      <div className="animate-slideInToLeft md:animate-opacity dark:bg-slate-900 p-6 truncate dark:text-white z-0 w-full bg-[#f2f2f2] h-full flex  gap-4 flex-col">
        <div className="flex gap-4">
          <div className="px-4 p-2 bg-white rounded w-fit dark:text-black lightShadow flex gap-2 items-center">
            <span className="font-bold">Total: </span>
            <span className="font-light">
              {allProjects?.length} <span>(projects)</span>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative px-4 p-2 rounded bg-white dark:text-black lightShadow flex gap-4 items-center"
          >
            <span className="font-bold">Project:</span>
            <ArrowDropDownIcon />
            {isOpen && (
              <div className="animate-opacity  absolute w-60 h-fit top-12 rounded left-0 bg-white strongShadow z-50">
                <ul className="dark:text-black w-full flex flex-col justify-start items-start p-4">
                  {allProjects?.map((data) => (
                    <li
                      key={data._id}
                      onClick={() => {
                        setProject(data);
                        setLoadMap(true);
                      }}
                      className="rounded hover:bg-slate-200 w-full duration-300 text-left px-2 py-2 font-medium"
                    >
                      {data?.projectName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        </div>
        <div className="strongShadow w-full h-full truncate rounded">
          <MapConfig
            setIsOpenChart={setIsOpenChart}
            isOpenChart={isOpenChart}
            viewport={viewport}
            project={project}
            loadMap={loadMap}
            setLoadMap={setLoadMap}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};
