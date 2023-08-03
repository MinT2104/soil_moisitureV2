import React from "react";
import { useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const SelectField = ({ setProjectChose, projectChose }) => {
  const [isOpenChooseProject, setIsOpenChooseProject] = useState(false);
  const selectObj = [
    {
      id: 1,
      name: "Esp32",
    },
    {
      id: 2,
      name: "ATmega328p",
    },
  ];
  //   console.log(projectchose);
  return (
    <div className="relative w-full">
      <div
        id="choose_project"
        onClick={() => {
          setIsOpenChooseProject(!isOpenChooseProject);
        }}
        className={`dark:border-white dark:text-white w-full h-[56px] rounded border-[0.5px] cursor-pointer hover:border-black flex justify-between items-center py-[16.5px] pl-[14px] pr-2 text-gray-500
    `}
      >
        <span id="choose_project" className="font-normal ">
          {projectChose || "Select your device"}
        </span>
        {isOpenChooseProject ? (
          <span>
            <ArrowDropUpIcon sx={{ fontSize: 20 }} />
          </span>
        ) : (
          <span>
            <ArrowDropDownIcon sx={{ fontSize: 20 }} />
          </span>
        )}
      </div>
      {isOpenChooseProject && (
        <div className="absolute top-16 left-0 w-full h-fit bg-white rounded p-2 text-black shadow-main animate-opacity z-50">
          {selectObj?.map((data) => (
            <div
              key={data.id}
              onClick={() => {
                setProjectChose(data?.name);
                setIsOpenChooseProject(false);
              }}
              className="p-4 cursor-pointer hover:bg-gray-200 rounded duration-300   font-normal"
            >
              {data?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
