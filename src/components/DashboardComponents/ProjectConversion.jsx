import React, { useLayoutEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "../../redux/reducer/currentProjectSlice";
export const ProjectConversion = ({
  setIsProjectConversion,
  allProjects,
  setIsPopupProjectManagementMob,
  isProjectConversion,
}) => {
  const dispatch = useDispatch();

  return (
    <li className="h-full animate-opacity dark:bg-[#2a213a] dark:text-white w-full bg-white absolute">
      <ul>
        <li className="dark:bg-[#2a213a] px-4 p-2 font-light duration-300 cursor-pointer border-b-[0.5px] border-slate-200 flex gap-4 items-center bg-slate-200">
          <ArrowBackIcon onClick={() => setIsProjectConversion(false)} />
          <input
            className="dark:bg-slate-700 w-full h-full p-2 bg-slate-200 outline-none border-b-[1px] border-black"
            placeholder="Search"
          />
        </li>
        {Array.from(allProjects).map((data, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(setCurrentProject(data));
              setIsPopupProjectManagementMob(false);
              setIsProjectConversion(!isProjectConversion);
            }}
            className="py-2 px-12 dark:hover:text-black font-light  hover:bg-slate-200 duration-300 cursor-pointer border-b-[0.5px] border-slate-200 flex gap-2 items-center"
          >
            {data?.projectName}
          </li>
        ))}
      </ul>
    </li>
  );
};
