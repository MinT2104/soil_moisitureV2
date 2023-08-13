import LooksIcon from "@mui/icons-material/Looks";
import "react-circular-progressbar/dist/styles.css";

const RainFall = ({ data }) => {
  return (
    <div className="w-full lg:w-1/6 rounded dark:bg-[#2a213a] h-fit justify-center bg-white md:bg-gray-200 flex items-center p-2">
      <div className="flex flex-row items-center justify-center gap-4 w-full">
        <div className="text-blue-500 h-fit bg-gray-300 p-1 rounded-full">
          <LooksIcon sx={{ fontSize: 30 }} />
        </div>
        <div className="text-black dark:text-white flex flex-col">
          <span className=" font-bold text-[14px]">RainFall</span>
          <span className=" font-light text-[10px]">
            {data ? `${data}mm` : <span className="text-red-500">_ _</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RainFall;
