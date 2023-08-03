import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
// import { yellow } from "@mui/material/colors";


const Volt = () => {

    const {newSensorChange} = useContext(AppContext)

    return ( 
        <div className="w-full dark:bg-[#2a213a] rounded h-fit justify-center md:justify-center md:bg-gray-200 bg-white flex items-center p-2">
          <div className="flex flex-row items-center gap-4 w-[150px]">
            <div className="text-yellow-500 h-fit bg-gray-300 p-1 rounded-full">
                <ElectricMeterIcon  sx={{fontSize: 30}}/>
            </div>
            <div className="text-black dark:text-white flex flex-col">
              <span className="  font-bold text-[14px]">Volt</span>
              <span className="  font-light text-[10px]">{newSensorChange | 0  }</span>
            </div>
          </div>
 
        {/* <CircularProgressbar
                value={100}
                text={`${newSensorChange}`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                backgroundColor: "#202836",
                textColor: "#fff",
                pathColor: "#2563eb",
                trailColor: "transparent",
                textSize : "14px"
                })}
            /> */}
    </div>
     );
}
 
export default Volt;