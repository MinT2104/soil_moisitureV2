import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import moment from "moment";
import { ToastContainer, toast } from "react-toast";
import apiProjectService from "../../services/ApiProjectService";
import { red } from "@mui/material/colors";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const AddnewFeed = ({
  setIsPostFeed,
  isPostFeed,
  postFeedRef,
  postFeedDay,
  setPostFeedDay,
  setPostFeedTime,
  postFeedTime,
  loadAllRain,
  setLoadAllRain,
  chooseDetail,
}) => {
  const { currentProject } = useContext(AppContext);
  const [err, setErr] = useState({ isOpen: false, message: "" });
  const handlePostFeed = () => {
    const data = {
      generated_date: postFeedDay["$d"],
      generated_time: postFeedTime["$d"],
      unit: "mm",
      field1: postFeedRef.current?.value,
    };
    if (
      postFeedRef.current?.value !== "" &&
      data.generated_date !== undefined &&
      data.generated_time !== undefined
    ) {
      apiProjectService
        .post("/rain/addFeed", {
          pid: chooseDetail?.pid,
          data: data,
        })
        .then((res) => {
          // console.log(res.data);
          try {
            apiProjectService.put(`/projects/${chooseDetail?.pid}`, {
              rainFall: postFeedRef.current?.value,
            });
          } catch (error) {
            console.log(err);
          }
          setIsPostFeed(false);
          setLoadAllRain(!loadAllRain);
          toast.success(`Create successfully!`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          });
        })
        .catch((err) =>
          toast.error(`Something's wrong!`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          })
        );
    } else {
      setErr({ isOpen: true, message: "Invalid data!" });
      setTimeout(() => {
        setErr({ isOpen: false, message: "" });
      }, 3000);
    }
  };
  return (
    <div className="dark:text-black shadow-xl animate-opacity absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
      <ToastContainer delay={3000} />
      <div
        onClick={() => setIsPostFeed(false)}
        className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-[0] "
      ></div>
      <div className="rounded flex gap-2 flex-col justify-between z-50 bg-white p-4 w-full md:w-1/3 sm:w-1/2 h-fit md:h-1/2">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-xl color-Primary p-4 text-white rounded">
            New Feed
          </h1>
          {err?.isOpen === true && (
            <span className="text-red-500 font-bold text-center">
              {err?.message}
            </span>
          )}
          <div className="animate-opacity w-full bg-white py-0 flex gap-2">
            <input
              ref={postFeedRef}
              className={`outline-none w-2/3 rounded border-[1px] p-4 border-slate-300 hover:border-slate-600`}
              placeholder="Enter new value"
              alt=""
            />
            <span className="outline-none w-1/3 rounded border-[1px] p-4 border-slate-300 hover:border-slate-600">
              mm
            </span>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Pick a day"
              value={postFeedDay}
              onChange={(newValue) => setPostFeedDay(newValue)}
            />
            <TimePicker
              label="With Time Clock"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              value={postFeedTime}
              onChange={(newValue) => setPostFeedTime(newValue)}
            />
          </LocalizationProvider>
        </div>

        <div className="w-full flex gap-2 items-center justify-end z-50">
          <button
            onClick={() => setIsPostFeed(!isPostFeed)}
            className="p-2 flex items-center text-slate-900 dark:text-white border-[1px] border-slate-300 rounded px-4"
          >
            <span>Cancel</span>
          </button>
          <button
            onClick={handlePostFeed}
            className="p-2 flex items-center color-Primary text-white rounded px-4"
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
