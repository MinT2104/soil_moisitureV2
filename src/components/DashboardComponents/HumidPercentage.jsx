import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import OpacityIcon from "@mui/icons-material/Opacity";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../../context/AppContext";
import { useContext, useMemo } from "react";
import { formatDataForChart } from "../../utils/FormatDataForChart";

const HumidPercentage = ({ number, data }) => {
  const value = (Number(data) / 3000) * 100;
  const roundedValue = Math.round((value + Number.EPSILON) * 100) / 100;
  return (
    <div className="w-full lg:w-1/6 rounded dark:bg-[#2a213a] h-fit justify-center md:justify-center  bg-white md:bg-gray-200 flex items-center p-2 ">
      <div className="flex flex-row items-center justify-center gap-4 w-full ">
        <div className="text-blue-500 h-fit bg-gray-300 p-1 rounded-full">
          <OpacityIcon sx={{ fontSize: 30 }} />
        </div>
        <div className="text-black dark:text-white flex flex-col">
          <span className=" font-bold text-[14px]">Humidty {number}</span>
          <span className=" font-light text-[10px] text-left">
            {roundedValue ? (
              `${roundedValue}%`
            ) : (
              <span className="text-red-500">_ _</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HumidPercentage;
