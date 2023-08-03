import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { now } from "moment/moment";
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

export default function DatePickerValue() {
  const dropDownRef = useRef(null);
  const filterState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);
  const { setDayObjectChosen } = useContext(AppContext);
  const [monthOrYear, setMonthOrYear] = useState("");
  const [intervalDay, setInterValDay] = useState({
    start: dayjs(new Date()),
    end: dayjs(new Date()),
  });
  const handleGetFilterDay = () => {
    const days = {
      type: "day",
      data: {
        start: dayjs(intervalDay.start.$d).format("DD/MM/YYYY"),
        end: dayjs(intervalDay.end.$d).format("DD/MM/YYYY"),
      },
    };
    setDayObjectChosen(days);
  };
  const handleGetMonth = () => {
    const days = {
      type: "month",
      data: {
        start: monthOrYear.$d,
        end: monthOrYear.$d,
      },
    };
    setDayObjectChosen(days);
  };
  const handleGetYear = () => {
    const days = {
      type: "year",
      data: {
        start: monthOrYear.$d,
        end: monthOrYear.$d,
      },
    };
    setDayObjectChosen(days);
  };
  const handleGetAllDays = () => {
    const days = {
      type: "all",
    };
    setDayObjectChosen(days);
  };
  const handleFilter = (e) => {
    dispatch(filterby(e.target.type));
    setIsDropDown(!isDropDown);
  };

  useLayoutEffect(() => {
    window.addEventListener("load", () => {
      dispatch(filterby("day"));
    });
  });
  useClickOutside(dropDownRef, setIsDropDown);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="dark:bg-[#2a213a] dark:text-white flex flex-col bg-white rounded">
        <div className=" md:flex-row flex items-center md:items-center flex-col justify-between md:gap-5">
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
              {filterState === "day" && (
                <div className="px-4 p-2 rounded color-Primary  text-white">
                  Day
                </div>
              )}
              {filterState === "month" && (
                <div className="px-4 p-2 rounded color-Primary text-white">
                  Month
                </div>
              )}
              {filterState === "year" && (
                <div className="px-4 p-2 rounded color-Primary text-white">
                  Year
                </div>
              )}
              {filterState === "interval" && (
                <div className="px-4 p-2 rounded color-Primary text-white">
                  Interval
                </div>
              )}
              {filterState === "all" && (
                <div className="px-4 p-2 rounded color-Primary text-white">
                  All
                </div>
              )}
            </button>
          </div>
          {filterState === "day" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
                    label="Pick a day"
                    value={intervalDay?.start}
                    onChange={(newValue) =>
                      setInterValDay({ end: newValue, start: newValue })
                    }
                  />
                </div>
              </div>
              <div className=" dark:text-white dark:bg-[#2a213a] gap-2 md:gap-5 w-fit p-2">
                <button
                  onClick={handleGetFilterDay}
                  className="text-white font-semibold p-4 md:w-fit rounded color-Primary"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
          {filterState === "month" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
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
          {filterState === "year" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
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
          {filterState === "interval" && (
            <div className="flex items-center gap-4 h-full md:w-fit w-full md:justify-end justify-center">
              <div className=" md:flex-row flex items-center justify-right gap-2 md:gap-5">
                <div className=" text-black rounded animate-opacity">
                  <DatePicker
                    label="Start"
                    value={intervalDay?.start}
                    onChange={(newValue) =>
                      setInterValDay({ ...intervalDay, start: newValue })
                    }
                  />
                </div>

                <div className=" text-black rounded animate-opacity">
                  <DatePicker
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
          {filterState === "all" && (
            <div className="dark:text-white dark:bg-[#2a213a] gap-2 md:gap-5 w-fit p-2">
              <button
                onClick={handleGetAllDays}
                className="text-white font-semibold p-4 w-fit rounded color-Primary"
              >
                Get All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
