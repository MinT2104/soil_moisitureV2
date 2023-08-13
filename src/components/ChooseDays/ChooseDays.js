import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { now } from "moment/moment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../context/AppContext";
import FilterListIcon from "@mui/icons-material/FilterList";
import { typeFilter } from "../../constant/typeFilter";
import { useDispatch, useSelector } from "react-redux";
import { filterby } from "../../redux/reducer/filterbySlice";
import { useClickOutside } from "../../hooks/useClickOutside";
import apiProjectService from "../../services/ApiProjectService";

export default function DatePickerValue() {
  const dropDownRef = useRef(null);
  const filterState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);
  const [forDropDown, setForDropDown] = useState(false);
  const [projectRain, setProjectRain] = useState([]);
  const {
    setDayObjectChosen,
    currentProject,
    setAllSenSorValue,
    setAllRain,
    allRain,
  } = useContext(AppContext);
  const [monthOrYear, setMonthOrYear] = useState(dayjs(new Date()));
  const [intervalDay, setInterValDay] = useState({
    start: dayjs(new Date()),
    end: dayjs(new Date()),
  });

  //---------------------------filter-------------------------
  const handleGetFilterDay = async () => {
    const days = {
      pid: currentProject?.pid,
      start: moment(intervalDay.start.$d).startOf("date"),
      end: moment(intervalDay.end.$d).endOf("date"),
    };
    // setDayObjectChosen(days);
    if (filterState?.by === "interval" && filterState?.for === "both") {
      const esp = await apiProjectService.post("/esp_sensor/feed.json", days);
      setAllSenSorValue(esp.data);
      const rain = await apiProjectService.post("/rain/feed.json", days);
      setAllRain(rain.data);
    }
    if (filterState?.by === "interval" && filterState?.for === "rainfall") {
      const rain = await apiProjectService.post("/rain/feed.json", days);
      setAllRain(rain.data);
    }
    if (filterState?.by === "interval" && filterState?.for === "humidty") {
      const esp = await apiProjectService.post("/esp_sensor/feed.json", days);
      setAllSenSorValue(esp.data);
    }
  };
  const handleGetMonth = async () => {
    const days = {
      pid: currentProject?.pid,
      start: moment(monthOrYear.$d).startOf("month"),
      end: moment(monthOrYear.$d).endOf("month"),
    };
    const esp = await apiProjectService.post("/esp_sensor/feed.json", days);
    setAllSenSorValue(esp.data);
    const rain = await apiProjectService.post("/rain/feed.json", days);
    setAllRain(rain.data);
  };
  const handleGetYear = async () => {
    const days = {
      pid: currentProject?.pid,
      start: moment(monthOrYear.$d).startOf("year"),
      end: moment(monthOrYear.$d).endOf("year"),
    };
    const esp = await apiProjectService.post("/esp_sensor/feed.json", days);
    setAllSenSorValue(esp.data);
    const rain = await apiProjectService.post("/rain/feed.json", days);
    setAllRain(rain.data);
  };
  const handleGetDate = async () => {
    const days = {
      pid: currentProject?.pid,
      start: moment(monthOrYear.$d).startOf("date"),
      end: moment(monthOrYear.$d).endOf("date"),
    };
    // setDayObjectChosen(days);
    const esp = await apiProjectService.post("/esp_sensor/feed.json", days);
    setAllSenSorValue(esp.data);
    const rain = await apiProjectService.post("/rain/feed.json", days);
    setAllRain(rain.data);
  };

  //------------------------- filter by--------------------------
  const handleFilter = (e) => {
    dispatch(filterby({ by: e.target.type, for: "both" }));
    setIsDropDown(!isDropDown);
  };
  //-----------------------initial--------------------------------
  useEffect(() => {
    const abortCtrl = new AbortController();
    window.addEventListener("load", () => {
      dispatch(filterby({ by: "day", for: "both" }));
    });
    const getFirstData = async () => {
      const days = {
        pid: currentProject?.pid,
        start: moment(new Date()).startOf("date"),
        end: moment(new Date()).endOf("date"),
      };
      const esp = await apiProjectService.post("/esp_sensor/feed.json", days);
      setAllSenSorValue(esp.data);
      const rain = await apiProjectService.post("/rain/feed.json", days);
      setAllRain(rain.data);
    };
    getFirstData();

    return () => {
      abortCtrl.abort();
    };
  }, [currentProject]);
  useEffect(() => {
    const abortCtrl = new AbortController();
    const getFirstDATA = async () => {
      const projectRain = await apiProjectService.post("/rain/getallfeed", {
        pid: currentProject?.pid,
      });
      setProjectRain(projectRain.data);
    };
    getFirstDATA();
    return () => {
      abortCtrl.abort();
    };
  }, [currentProject]);

  useClickOutside(dropDownRef, setIsDropDown);
  //------------------find missing data---------------------------
  // function findMissingDates(dateArray) {
  //   const missingDates = [];
  //   const startDate = new Date(dateArray[0]);
  //   const endDate = new Date();

  //   for (
  //     let date = startDate;
  //     date <= endDate;
  //     date.setDate(date.getDate() + 1)
  //   ) {
  //     const dateString = moment(date).format("DD/MM/YYYY");
  //     if (
  //       !dateArray.some(
  //         (date) => moment(date).format("DD/MM/YYYY") === dateString
  //       )
  //     ) {
  //       missingDates.push(new Date(date));
  //     }
  //   }

  //   return missingDates;
  // }
  // console.log(projectRain);

  // const missingDatesArray = findMissingDates(
  //   (filterState.by === "interval" && filterState?.for === "both") ||
  //     (filterState.by === "interval" && filterState?.for === "rainfall")
  //     ? projectRain?.map((data) => new Date(data?.generated_date))
  //     : []
  // );

  // function shouldDisableDate(date) {
  //   return missingDatesArray.some(
  //     (disabledDate) =>
  //       new Date(date).toDateString() === new Date(disabledDate).toDateString()
  //   );
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="dark:bg-[#2a213a] dark:text-white flex flex-col bg-white rounded">
        <div className=" md:flex-row flex items-center md:items-center flex-col justify-between gap-2 lg:gap-5">
          <div className="flex items-center flex-col lg:flex-row">
            <div
              ref={dropDownRef}
              className="relative w-fit  p-4 flex items-center gap-4"
            >
              {isDropDown && (
                <div className="absolute animate-opacity strongShadow top-20 z-50 bg-white w-[200px] h-fit rounded ">
                  <ul className="p-4">
                    {typeFilter.map((data) => (
                      <li
                        onClick={handleFilter}
                        className="cursor-pointer px-4 p-2 hover:bg-slate-200 rounded"
                        type={data.type}
                        key={data.id}
                      >
                        {data.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => setIsDropDown(!isDropDown)}
                className=" h-full flex border-slate-600 hover:text-black text-slate-600 hover:border-black border-[1px] gap-4 items-center  p-2 rounded"
              >
                <FilterListIcon />
                <span className="font-bold">Filter by: </span>
                {filterState?.by === "day" && (
                  <div className="px-4 p-2 rounded color-Primary  text-white">
                    Day
                  </div>
                )}
                {filterState?.by === "month" && (
                  <div className="px-4 p-2 rounded color-Primary text-white">
                    Month
                  </div>
                )}
                {filterState?.by === "year" && (
                  <div className="px-4 p-2 rounded color-Primary text-white">
                    Year
                  </div>
                )}
                {filterState?.by === "interval" && (
                  <div className="px-4 p-2 rounded color-Primary text-white">
                    Interval
                  </div>
                )}
                {/* {filterState?.by === "all" && (
                <div className="px-4 p-2 rounded color-Primary text-white">
                  All
                </div>
              )} */}
              </button>
            </div>
            {filterState?.by === "interval" && (
              <div
                onClick={() => setForDropDown(!forDropDown)}
                className="relative border-slate-600 hover:text-black text-slate-600 hover:border-black border-[1px] px-6 p-2 rounded flex items-center gap-2 cursor-pointer"
              >
                {forDropDown && (
                  <div className="absolute animate-opacity strongShadow top-16 left-0 z-50 text-black bg-white w-full h-fit rounded ">
                    <ul className="p-4">
                      <li
                        onClick={() => {
                          dispatch(filterby({ by: "interval", for: "both" }));
                        }}
                        className="cursor-pointer px-4 p-2 hover:bg-slate-200 rounded"
                      >
                        Filter for Humidty & Rainfall
                      </li>
                      <li
                        onClick={() => {
                          dispatch(
                            filterby({ by: "interval", for: "humidty" })
                          );
                        }}
                        className="cursor-pointer px-4 p-2 hover:bg-slate-200 rounded"
                      >
                        Filter for Humidty
                      </li>
                      <li
                        onClick={() => {
                          dispatch(
                            filterby({ by: "interval", for: "rainfall" })
                          );
                        }}
                        className="cursor-pointer px-4 p-2 hover:bg-slate-200 rounded"
                      >
                        Filter for Rainfall
                      </li>
                    </ul>
                  </div>
                )}
                <span className="font-bold">Filter for:</span>
                {filterState?.by === "interval" &&
                  filterState?.for === "both" && (
                    <div className="px-4 p-2 rounded color-Primary text-white">
                      Humidty & Rainfall
                    </div>
                  )}
                {filterState?.by === "interval" &&
                  filterState?.for === "humidty" && (
                    <div className="px-4 p-2 rounded color-Primary text-white">
                      Humidty
                    </div>
                  )}
                {filterState?.by === "interval" &&
                  filterState?.for === "rainfall" && (
                    <div className="px-4 p-2 rounded color-Primary text-white">
                      Rainfall
                    </div>
                  )}
              </div>
            )}
          </div>

          {filterState?.by === "day" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
                    key={1}
                    disableFuture
                    label="Pick a day"
                    value={monthOrYear}
                    onChange={(newValue) => setMonthOrYear(newValue)}
                  />
                </div>
              </div>
              <div className=" dark:text-white dark:bg-[#2a213a] gap-2 md:gap-5 w-fit p-2">
                <button
                  onClick={handleGetDate}
                  className="text-white font-semibold p-4 md:w-fit rounded color-Primary"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
          {filterState?.by === "month" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
                    key={2}
                    disableFuture
                    label="Pick a month"
                    value={monthOrYear}
                    views={["month", "year"]}
                    onChange={(newValue) => setMonthOrYear(newValue)}
                  />
                </div>
              </div>
              <div className=" dark:text-white dark:bg-[#2a213a] gap-2 md:gap-5 w-fit p-2">
                <button
                  onClick={handleGetMonth}
                  className="text-white font-semibold p-4  w-fit rounded color-Primary"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
          {filterState?.by === "year" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
                    key={3}
                    disableFuture
                    label="Pick a year"
                    value={monthOrYear}
                    views={["year"]}
                    onChange={(newValue) => setMonthOrYear(newValue)}
                  />
                </div>
              </div>
              <div className=" dark:text-white dark:bg-[#2a213a] gap-2 md:gap-5 w-fit p-2">
                <button
                  onClick={handleGetYear}
                  className="text-white font-semibold p-4 w-fit rounded color-Primary"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
          {filterState?.by === "interval" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
                    key={4}
                    disableFuture
                    label="Start"
                    value={intervalDay?.start}
                    onChange={(newValue) =>
                      setInterValDay({ ...intervalDay, start: newValue })
                    }
                  />
                </div>

                <div className=" text-black rounded animate-opacity">
                  <DatePicker
                    key={5}
                    disableFuture
                    label="End"
                    value={intervalDay?.end}
                    onChange={(newValue) =>
                      setInterValDay({ ...intervalDay, end: newValue })
                    }
                  />
                </div>
              </div>
              <div className=" dark:text-white dark:bg-[#2a213a] gap-2 md:gap-5 w-fit p-2">
                <button
                  onClick={handleGetFilterDay}
                  className="text-white font-semibold p-4 w-fit rounded color-Primary"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
