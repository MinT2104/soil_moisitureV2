import LooksIcon from '@mui/icons-material/Looks';
import "react-circular-progressbar/dist/styles.css";

const RainFall = () => {
    return ( 
        <div className="w-full rounded dark:bg-[#2a213a] h-fit justify-center md:justify-center bg-white md:bg-gray-200 flex items-center p-2">
          <div className="flex flex-row items-center gap-4 w-[150px]">
              <div className="text-blue-500 h-fit bg-gray-300 p-1 rounded-full">
                  <LooksIcon sx={{fontSize: 30}}/>
              </div>
              <div className="text-black dark:text-white flex flex-row md:flex-col">
              <span className=" font-bold text-[14px]">RainFall</span>
              <span className=" font-light text-[10px]">{0}</span>
              </div>
          </div>
            </div>
     );
}
 
export default RainFall;