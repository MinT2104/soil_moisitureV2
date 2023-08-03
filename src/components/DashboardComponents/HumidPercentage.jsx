import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import OpacityIcon from '@mui/icons-material/Opacity';
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const HumidPercentage = () => {
    const {newSensorChange,currentProject} = useContext(AppContext)
    const value = Number(newSensorChange)/330 *100
    const roundedValue = Math.round((value + Number.EPSILON) * 100) / 100;
    return ( 
        <div className="w-full rounded dark:bg-[#2a213a] h-fit justify-center md:justify-center  bg-white md:bg-gray-200 flex items-center p-2 ">
          <div className="flex flex-row items-center gap-4 w-[150px] ">
            <div className="text-blue-500 h-fit bg-gray-300 p-1 rounded-full">
                <OpacityIcon sx={{fontSize: 30}}/>
            </div>
            <div className="text-black dark:text-white flex flex-row md:flex-col">
              <span className=" font-bold text-[14px]">Humidty</span>
              <span className=" font-light text-[10px] text-left">{roundedValue}%</span>
            </div>
          </div>
    </div>
     );
}
 
export default HumidPercentage;