import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";




const HumidLevel = () => {
    const {currentProject} = useContext(AppContext)
    const [humidLevel, setHumidLevel] = useState(currentProject.humidLevel)
    const [load, setLoad] = useState(true)
    return (
        <div className="justify-center w-full bg-[#2f3b50] rounded h-[80px]">
            <div className="flex justify-center items-center flex-col h-full gap-1 py-2 md:py-1.5">
            <span className="font-bold text-lg text-white">Humidty level: </span>
            <div className="flex flex-row gap-4 items-center">
                <div
                onClick={()=>decreaseCount(currentProject)}
                className="cursor-pointer p-0.5 bg-red-500 text-white rounded"><RemoveIcon/></div>
                <span className="font-light text-sm text-white">{humidLevel}% </span>
                <div
                onClick={()=>increaseCount(currentProject)}
                className="cursor-pointer p-0.5 bg-green-500 text-white rounded"><AddIcon/></div>
                </div>
                {/* <div className="w-4/5 h-4 bg-gray-600 rounded-full truncate">
                    <div style={{width:`${humidLevel}%`}} className=" bg-blue-600 h-full rounded-full"></div>
                </div> */}
            </div>
        </div> 
        );
}
 
export default HumidLevel;