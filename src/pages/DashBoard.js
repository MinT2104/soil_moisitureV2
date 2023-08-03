import Title from "../components/Header/Header";
import Degree from "../components/DashboardComponents/Degree";
import Storage from "../components/DashboardComponents/Storage";
import RainFall from "../components/DashboardComponents/RainFall";
import Volt from "../components/DashboardComponents/Volt";
// import HumidLevel from "../components/DashboardComponents/HumidLevel"
import { AppContext } from "../context/AppContext";
import HumidPercentage from "../components/DashboardComponents/HumidPercentage";
import Chart from "../components/DashboardComponents/Chart";
import { CSVLink } from "react-csv";
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import ButtonControl from "../components/DashboardComponents/ButtonControl";
import DatePickerValue from "../components/ChooseDays/ChooseDays";
import MinMax from "../components/MinMax/MinMax";
import MapPopup from "../components/DashboardComponents/MapPopup";
import NavBar from "../components/NavBar.js/NavBar";
import MobBar from "../components/NavBar.js/MobBar";
import LoopIcon from "@mui/icons-material/Loop";
import LineAxisOutlinedIcon from "@mui/icons-material/LineAxisOutlined";
import { ProjectConversion } from "../components/DashboardComponents/ProjectConversion";
import { ProjectMangagementMob } from "../components/DashboardComponents/ProjectMangagementMob";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TableData } from "../components/tableData/TableData";
import RainFallChart from "../components/Chart/RainFallChart";
import { FilterForChart } from "../utils/FilterForChart";
import { findMinMax } from "../utils/findMinMax";
import { DefaultLayout } from "../layouts/DefaultLayout";
import moment from "moment";

const DashBoard = () => {
  const {
    allSenSorValue,
    currentProject,
    dayObjectChosen,
    setIsChooseMapPopup,
    isChooseMapPopup,
    allProjects,
    reFreshChart,
    setReFreshChart,
    isOpenSideBar,
    setIsOpenSideBar,
    setCurrentProject,
  } = useContext(AppContext);
  const [isProjectconversion, setIsProjectConversion] = useState(false);
  const [loadTable, setloadTable] = useState(false);
  const [isPopupProjectManagementMob, setIsPopupProjectManagementMob] =
    useState(false);
  const [isOpenChart, setIsOpenChart] = useState(false);
  const [isAnotherValue, setIsAnotherValue] = useState(false);
  const [initialIndex, setInitialIndex] = useState({});
  const [dataCSV, setDataCSV] = useState([]);

  //----------------date filter------------------

  const filterDateTime = useMemo(() => {
    return FilterForChart(
      dayObjectChosen,
      initialIndex,
      currentProject,
      allSenSorValue
    );
  }, [dayObjectChosen, initialIndex]);

  const {
    initialValueCreated,
    initialValueField1,
    initialValueField2,
    filteredObjectCreated,
    filteredObjectField1,
    filteredObjectField2,
    valueCreate,
    valueField1,
    valueField2,
  } = filterDateTime;
  //---------------------------------

  useEffect(() => {
    setInitialIndex({
      indexEnd: allSenSorValue.length - 1,
      indexStart: allSenSorValue.length - 40,
    });
    const dataForCSV = allSenSorValue?.map((data) => {
      return {
        date: moment(data.created_at).format("DD/MM/YYYY hh:mm a"),
        depth_1: (
          (data?.field1 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
          3000
        ).toFixed(0),
        depth_2: (
          (data?.field2 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
          3000
        ).toFixed(0),
      };
    });
    setDataCSV(dataForCSV);
  }, [allSenSorValue]);

  const { min, max } = findMinMax(
    dayObjectChosen ? filteredObjectField1 : valueField1
  );
  const firstValue = dayObjectChosen ? filteredObjectField1[0] : valueField1[0];
  const lastValue = dayObjectChosen
    ? filteredObjectField1[filteredObjectField1.length - 1]
    : valueField1[valueField1.length - 1];

  useEffect(() => {
    setIsOpenSideBar(false);
  }, []);
  const handleMapPopup = () => {
    setIsChooseMapPopup(true);
    setIsPopupProjectManagementMob(false);
  };
  useEffect(() => {
    const scrollbarDivHome =
      document.getElementsByClassName("scrollbarDivHome");
    scrollbarDivHome[0].addEventListener("mouseover", () => {
      scrollbarDivHome[0].classList.remove("scrollbar");
    });
    scrollbarDivHome[0].addEventListener("mouseout", () => {
      scrollbarDivHome[0].classList.add("scrollbar");
    });
  }, []);

  return (
    <DefaultLayout title="My Dashboard">
      {isAnotherValue && (
        <section className="shadow-xl absolute left-0 w-full h-screen z-50 flex items-center justify-center  dark:bg-[#2a213a] ">
          <div
            onClick={() => setIsAnotherValue(false)}
            className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-50"
          ></div>
          <div className="flex flex-col w-1/2 lex-wrap gap-1 bg-white z-50 rounded h-1/2 p-2">
            <Volt />
            <Degree />
            <HumidPercentage />
            <Storage />
            <RainFall />
          </div>
        </section>
      )}
      {isOpenSideBar && <MobBar setIsOpenSideBar />}
      {isOpenChart && (
        <section className=" animate-opacity bg-white z-40 absolute w-full h-[calc(100%-60px)] top-[60px] dark:bg-[#2a213a] ">
          <div
            onClick={() => setIsOpenChart(false)}
            className="flex items-center gap-2 text-blue-600 bg-blue-200 w-fit m-4 mb-0 p-2 rounded hover:bg-slate-100 cursor-pointer"
          >
            <ArrowBackIcon /> <span>Back</span>
          </div>
          <div className=" dark:bg-[#2a213a] dark:text-white scrollbar pt-2 w-full  h-fit bg-white rounded px-4">
            <Chart
              filteredObjectCreated={filteredObjectCreated}
              valueCreate={valueCreate}
              valueField1={valueField1}
              valueField2={valueField2}
              filteredObjectField1={filteredObjectField1}
              filteredObjectField2={filteredObjectField1}
            />
          </div>
        </section>
      )}

      {isChooseMapPopup && (
        <div className="shadow-xl animate-opacity absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
          <div
            onClick={() => setIsChooseMapPopup(false)}
            className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-50"
          ></div>
          <div className="z-50 w-2/3 bg-white h-2/3 rounded-xl truncate">
            <MapPopup setIsChooseMapPopup={setIsChooseMapPopup} />
          </div>
        </div>
      )}
      {isPopupProjectManagementMob && (
        <div className="dark:text-black shadow-xl animate-opacity absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
          <div
            onClick={() => setIsPopupProjectManagementMob(false)}
            className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-[0] "
          ></div>
          <div className="z-50 w-4/5 bg-white h-1/2 rounded-xl truncate flex flex-col justfy-between items-center">
            <ul className="w-full relative dark:bg-[#2a213a] dark:text-white">
              {isProjectconversion && (
                <ProjectConversion
                  setIsPopupProjectManagementMob={
                    setIsPopupProjectManagementMob
                  }
                  setIsProjectConversion={setIsProjectConversion}
                  setCurrentProject={setCurrentProject}
                  allProjects={allProjects}
                />
              )}
              <li
                onClick={() => setIsProjectConversion(true)}
                className="dark:hover:bg-blue-500 px-4 py-4 font-light hover:bg-slate-200 duration-300 cursor-pointer border-b-[0.5px] border-slate-200 flex gap-2 items-center"
              >
                <LoopIcon /> <span>Project Conversion</span>
              </li>

              {/* <li
                  onClick={handleMapPopup}
                  className="dark:hover:bg-blue-500 px-4 py-4 font-light hover:bg-slate-200 duration-300 cursor-pointer border-b-[0.5px] border-slate-200 flex gap-2 items-center"
                >
                  <MapIcon /> <span>Map Management</span>
                </li> */}
              <li
                onClick={() => {
                  setIsOpenChart(true);
                  setIsPopupProjectManagementMob(false);
                }}
                className="dark:hover:bg-blue-500 px-4 py-4 font-light hover:bg-slate-200 duration-300 cursor-pointer border-b-[0.5px] border-slate-200 flex gap-2 items-center"
              >
                <LineAxisOutlinedIcon /> <span>Open Chart</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="scrollbar relative w-full flex flex-row rounded bg-white md:flex-nowrap flex-wrap h-full">
        <div className="scrollbar animate-slideInToLeft md:animate-opacity dark:bg-slate-900 flex lg:flex-row w-full h-full gap-1 p-1 createBg ">
          <div className="scrollbar scrollbarDivHome flex flex-col gap-1 md:w-4/5 w-full overflow-auto h-full">
            <ProjectMangagementMob
              currentProject={currentProject}
              setIsPopupProjectManagementMob={setIsPopupProjectManagementMob}
            />
            <DatePickerValue />
            <div className="shadow-xl w-full flex  lg:flex-row gap-1 flex-col">
              <ButtonControl
                loadTable={loadTable}
                setloadTable={setloadTable}
              />
              <div className="flex flex-row w-full lg:w-1/2 gap-1">
                <MinMax name="Max Value" value={max} />
                <MinMax name="Min Value" value={min} />
                <MinMax name="First Value" value={firstValue} />
                <MinMax name="Last Value" value={lastValue} />
              </div>
            </div>
            <div className="dark:bg-[#2a213a] dark:text-white shadow-xl animate-opacity w-full md:block hidden">
              <div className=" dark:bg-[#2a213a] relative dark:text-white scrollbar pt-2 w-full  h-fit bg-white rounded px-4">
                <div
                  onClick={() => setReFreshChart(!reFreshChart)}
                  className="cursor-pointer absolute top-2 right-2  z-40 p-1 color-Primary rounded text-white"
                >
                  <RefreshIcon sx={{ fontSize: 30 }} />
                </div>
                <Chart
                  initialValueCreated={initialValueCreated}
                  initialValueField2={initialValueField2}
                  initialValueField1={initialValueField1}
                  filteredObjectCreated={filteredObjectCreated}
                  filteredObjectField1={filteredObjectField1}
                  filteredObjectField2={filteredObjectField2}
                />
              </div>
            </div>
            <div className="dark:bg-[#2a213a] dark:text-white shadow-xl animate-opacity w-full md:block hidden">
              <div className=" dark:bg-[#2a213a] relative dark:text-white scrollbar pt-2 w-full  h-fit bg-white rounded px-4">
                <div
                  onClick={() => setReFreshChart(!reFreshChart)}
                  className="cursor-pointer absolute top-2 right-2  z-50 p-1 color-Primary rounded text-white"
                >
                  <RefreshIcon sx={{ fontSize: 30 }} />
                </div>
                <RainFallChart />
              </div>
            </div>
            <div className="dark:bg-slate-900 md:hidden flex flex-col w-full lex-wrap gap-1 bg-slate-200 md:bg-white rounded h-1/2 p-2">
              <Volt />
              <Degree />
              <HumidPercentage />
              <Storage />
              <RainFall />
            </div>
          </div>
          <div className="relative md:block hidden shadow-xl h-full w-full md:w-1/5 md:mb-0 mb-10 bg-white rounded dark:bg-[#2a213a] dark:text-white">
            <div className="absolute bottom-0 color-Primary text-white w-full h-fit p-4 font-bold z-40 flex items-center justify-center">
              <CSVLink data={dataCSV} filename={currentProject?.projectName}>
                Export
              </CSVLink>
            </div>
            <div
              onClick={() => setIsProjectConversion(true)}
              className="p-2 cursor-pointer px-4 flex justify-start gap-4 items-center color-Primary text-white"
            >
              <LoopIcon sx={{ fontSize: 35 }} />
              <span className=" dark:text-white font-bold text-[30px] flex items-center break-all">
                {currentProject?.projectName || (
                  <span className="text-xl font-bold">
                    Please choose project
                  </span>
                )}
              </span>
            </div>
            <ul className="relative dark:bg-[#2a213a] dark:text-white">
              {isProjectconversion && (
                <ProjectConversion
                  setIsProjectConversion={setIsProjectConversion}
                  setCurrentProject={setCurrentProject}
                  allProjects={allProjects}
                  isProjectConversion={isProjectconversion}
                />
              )}
              <TableData setloadTable={setloadTable} loadTable={loadTable} />
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DashBoard;
