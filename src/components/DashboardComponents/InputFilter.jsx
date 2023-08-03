import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";

const InputFilter = (props) => {
  const userRedux = useSelector((state) => state);
  const {
    setIsChoosePopup,
    allProjects,
    setAllProjects,
    setCurrentProject,
    loading,
    setLoading,
  } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  // const inputRef = useRef()
  const handleFilterSearch = (e) => {
    setInputValue(e.target.value);
  };
  const filteredProject = allProjects.filter((data) => {
    return data.projectName.toLowerCase().includes(inputValue?.toLowerCase());
  });
  return (
    <div className="z-30 flex w-1/2 animate-opacity md:block flex-row items-start bg-transparent justify-start">
      <div
        className={`relative p-1 rounded-xl flex flex-row w-full ${props.properties}`}
      >
        <input
          value={inputValue}
          onChange={handleFilterSearch}
          placeholder="Search..."
          className="p-2 w-full bg-transparent outline-none text-black"
          alt=""
        />
        <div
          onClick={() => setIsChoosePopup(false)}
          className="px-4 cursor-pointer bg-gray-400 rounded-xl flex items-center justify-center"
        >
          <span>
            <SearchIcon sx={{ fontSize: 20, color: "white" }} />
          </span>
        </div>
        {inputValue && (
          <div className="rounded z-50 absolute w-full min-h-[100px] max-h-72 bg-gray-500 p-2 flex flex-col gap-2 top-14 left-0">
            {Array.from(filteredProject)?.map((data, index) => (
              <div
                onClick={() => {
                  setIsChoosePopup(false);
                  setCurrentProject(data);
                  setLoading(loading);
                  setInputValue("");
                }}
                key={index}
                className="flex  animate-opacity bg-white justify-start items-center w-full mx-auto cursor-pointer hover p-2 px-4 rounded text-md font-light text-black hover:scale-95 duration-300 hover:bg-gray-400"
              >
                <span className="truncate">{data.projectName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFilter;
