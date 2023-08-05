import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "react-circular-progressbar/dist/styles.css";

const Degree = () => {
  return (
    <div className="w-1/5 rounded dark:bg-[#2a213a] h-fit justify-center md:justify-center  bg-white md:bg-gray-200 flex items-center p-2">
      <div className="flex flex-row items-center gap-4 w-full justify-center">
        <div className="text-red-500 h-fit bg-gray-300 p-1 rounded-full">
          <WbSunnyIcon sx={{ fontSize: 30 }} />
        </div>
        <div className="text-black dark:text-white flex flex-row md:flex-col">
          <span className=" dark:text-white font-bold text-[14px]">Degree</span>
          <span className=" dark:text-white font-light text-[10px]">{0}</span>
        </div>
      </div>
    </div>
  );
};

export default Degree;
