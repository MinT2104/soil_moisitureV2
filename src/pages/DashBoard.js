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
import { findMinMax1, findMinMax2 } from "../utils/findMinMax";
import { DefaultLayout } from "../layouts/DefaultLayout";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import { formatDataForChart } from "../utils/FormatDataForChart";
import { OtherValue } from "../utils/OtherValue";
import apiProjectService from "../services/ApiProjectService";

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
  const [rainValue, setRainValue] = useState(NaN);

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
  //---------------------------------
  const { field1, field2, date } = useMemo(() => {
    return formatDataForChart(currentProject, allSenSorValue);
  }, [allSenSorValue]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    let isMuted = false;
    setInitialIndex({
      indexEnd: allSenSorValue?.length - 1,
      indexStart: allSenSorValue?.length - 40,
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
    return () => {
      abortCtrl.abort();
      isMuted = true;
    };
  }, [allSenSorValue]);
  useEffect(() => {
    const abortCtrl = new AbortController();
    let isMuted = false;

    const getRain = async () => {
      const data = await apiProjectService.post("/rain/getallfeed", {
        pid: currentProject?.pid,
      });
      setRainValue(data?.data[data.data?.length - 1]?.field1);
    };
    getRain();

    return () => {
      abortCtrl.abort();
      isMuted = true;
    };
  }, [currentProject]);
  useEffect(() => {
    setIsOpenSideBar(true);
    return setIsOpenSideBar(false);
  }, []);

  const handleMapPopup = () => {
    setIsChooseMapPopup(true);
    setIsPopupProjectManagementMob(false);
  };

  const {
    min1,
    max1,
    min2,
    max2,
    firstValue1,
    firstValue2,
    lastValue1,
    lastValue2,
  } = OtherValue(currentProject, allSenSorValue);

  return (
    <DefaultLayout title="My Dashboard">
      {isProjectconversion && (
        <ProjectConversion
          setIsProjectConversion={setIsProjectConversion}
          setCurrentProject={setCurrentProject}
          allProjects={allProjects}
          isProjectConversion={isProjectconversion}
        />
      )}
      {isOpenSideBar && <MobBar />}
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
            // filteredObjectCreated={filteredObjectCreated}
            // valueCreate={valueCreate}
            // valueField1={valueField1}
            // valueField2={valueField2}
            // filteredObjectField1={filteredObjectField1}
            // filteredObjectField2={filteredObjectField1}
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
        <div className="dark:text-black shadow-xl animate-opacity fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
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
                onClick={() => {
                  setIsOpenChart(true);
                  setIsPopupProjectManagementMob(false);
                }}
                className="dark:hover:bg-blue-500 px-4 py-4 font-light hover:bg-slate-200 duration-300 cursor-pointer border-b-[0.5px] border-slate-200 flex gap-2 items-center"
              >
                <LineAxisOutlinedIcon /> <span>Open Chart</span>
              </li> */}
            </ul>
          </div>
        </div>
      )}

      <div className="scrollbar relative w-full flex flex-row rounded bg-white md:flex-nowrap flex-wrap h-fit md:h-full">
        <div className="scrollbar animate-slideInToLeft md:animate-opacity dark:bg-slate-900 flex lg:flex-row w-full h-fit gap-1 p-1 overflow-auto createBg ">
          <div className="scrollbar scrollbarDivHome flex flex-col gap-1 w-full h-full">
            <ProjectMangagementMob
              currentProject={currentProject}
              setIsPopupProjectManagementMob={setIsPopupProjectManagementMob}
            />
            <div className="shadow-xl w-full flex h-fit lg:h-20 lg:flex-row gap-1 flex-col">
              <div className="lg:flex hidden w-full lg:w-1/2 p-2  px-4  justify-start gap-4 bg-white items-center text-black rounded">
                <div
                  onClick={() => setIsProjectConversion(true)}
                  className=" cursor-pointer px-4 p-2 rounded border-[1px] border-black flex gap-2 items-center"
                >
                  <LoopIcon className="text-blue-500" sx={{ fontSize: 30 }} />
                  <span>Change Project</span>
                </div>
                <span className=" dark:text-white font-bold text-[30px] flex items-center break-all text-blue-500">
                  {currentProject?.projectName || (
                    <span className="text-sm md:text-xl font-bold">
                      Please choose project
                    </span>
                  )}
                </span>
              </div>
              <ButtonControl
                loadTable={loadTable}
                setloadTable={setloadTable}
              />
            </div>
            <DatePickerValue />

            <section className="flex gap-1 flex-wrap lg:flex-nowrap">
              <div className="dark:bg-[#2a213a] dark:text-white shadow-xl animate-opacity w-full">
                <div className=" dark:bg-[#2a213a] relative dark:text-white scrollbar pt-6 w-full  h-fit bg-white rounded px-4">
                  <div
                    onClick={() => setReFreshChart(!reFreshChart)}
                    className="cursor-pointer absolute top-2 right-2  z-40 p-1 color-Primary rounded text-white"
                  >
                    <RefreshIcon sx={{ fontSize: 30 }} />
                  </div>
                  <Chart />
                </div>
              </div>
              <div className="dark:bg-[#2a213a] dark:text-white shadow-xl animate-opacity w-full">
                <div className=" dark:bg-[#2a213a] relative dark:text-white scrollbar pt-6 w-full  h-fit bg-white rounded px-4">
                  <div
                    onClick={() => setReFreshChart(!reFreshChart)}
                    className="cursor-pointer absolute top-2 right-2  z-40 p-1 color-Primary rounded text-white"
                  >
                    <RefreshIcon sx={{ fontSize: 30 }} />
                  </div>
                  <RainFallChart />
                </div>
              </div>
            </section>
            <div className="shadow-xl w-full flex h-fit lg:h-28 lg:flex-row gap-1 flex-col">
              <div className="flex flex-row w-full lg:w-1/2 gap-1">
                <MinMax name="Max Value 1" value={max1} />
                <MinMax name="Min Value 1" value={min1} />
                <MinMax name="First Value 1" value={firstValue1} />
                <MinMax name="Last Value 1" value={lastValue1} />
              </div>
              <div className="flex flex-row w-full lg:w-1/2 gap-1">
                <MinMax name="Max Value 2" value={max2} />
                <MinMax name="Min Value 2" value={min2} />
                <MinMax name="First Value 2" value={firstValue2} />
                <MinMax name="Last Value 2" value={lastValue2} />
              </div>
            </div>
            <div className="flex w-full flex-wrap lg:flex-nowrap gap-1 lg:bg-white rounded h-fit lg:p-2">
              <Volt number={1} data={field1[field1?.length - 1]} />
              <Volt number={2} data={field2[field2?.length - 1]} />
              <HumidPercentage number={1} data={field1[field1?.length - 1]} />
              <HumidPercentage number={2} data={field2[field2?.length - 1]} />
              <Degree />
              <Storage />
              <RainFall data={rainValue} />
            </div>
            <div className="py-4">
              <hr className="w-3/5 mx-auto" />
            </div>
            <section className=" border-white border-[1px] truncate rounded-tl-md rounded-tr-md mb-4">
              <div className="w-full p-2 bg-white text-sm text-white color-Primary font-light gap-4 flex items-center justify-center">
                <span className="">
                  <InfoIcon />
                </span>
                <span>Project Detail</span>
              </div>
              <table className="lg:block hidden min-w-full divide-y divide-white-200 bg-white dark:divide-gray-700 overflow-x-auto">
                <thead className="animate-opacity text-black border-b-[1px] border-slate-300">
                  <tr className="font-light text-left">
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase" />
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase">
                      Install date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase">
                      Esp status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase">
                      Pump status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium uppercase">
                      Device
                    </th>
                    <th className="p-2 px-4 text-center font-semibold text-sm">
                      Depth level 1
                    </th>
                    <th className="p-2 px-4 text-left font-semibold text-sm">
                      Depth level 2
                    </th>
                    <th className="p-2 px-4 text-left font-semibold text-sm">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="animate-opacity overflow-auto">
                  {currentProject?.projectName === undefined ? (
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-nowrap uppercase text-sm text-red-500 dark:text-gray-200 text-center"
                        colSpan={8}
                      >
                        Project is not available
                      </td>
                    </tr>
                  ) : (
                    <tr
                      className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800 border-b-[1px] border-slate-300"
                      key={currentProject.pid}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                        #
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 text-center">
                        {currentProject.projectName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                        {moment(currentProject?.created_at).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                        {currentProject?.isEsp ? (
                          <span className="text-green-600 bg-green-200 p-2 rounded">
                            Active
                          </span>
                        ) : (
                          <span className="text-orange-600 bg-orange-200 p-2 rounded">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                        {currentProject?.isPump ? (
                          <span className="text-green-600 bg-green-200 p-2 rounded">
                            Active
                          </span>
                        ) : (
                          <span className="text-orange-600 bg-orange-200 p-2 rounded">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-center">
                        {currentProject.type}
                      </td>
                      <td className="p-2 px-4 text-center font-semibold text-sm">
                        {currentProject?.depth_level_1 ? (
                          currentProject?.depth_level_1
                        ) : (
                          <span className="text-red-500">_ _</span>
                        )}
                      </td>
                      <td className="p-2 px-4 text-center  font-semibold text-sm">
                        {currentProject?.depth_level_2 ? (
                          currentProject?.depth_level_2
                        ) : (
                          <span className="text-red-500">_ _</span>
                        )}
                      </td>
                      <td className=" p-2 px-4 text-center  font-semibold text-sm">
                        <CSVLink
                          className="bottom-0 color-Primary text-white w-full h-fit p-2 rounded font-bold z-40 flex items-center justify-center"
                          data={dataCSV}
                          filename={currentProject?.projectName}
                        >
                          Export
                        </CSVLink>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bg-white p-2">
                <TableData />
              </div>
            </section>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DashBoard;
