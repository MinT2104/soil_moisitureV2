import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { sortby } from "../../redux/reducer/sortSlice";
import SortIcon from "@mui/icons-material/Sort";

export const Sort = () => {
  const [popup, setPopup] = useState(false);
  const dropDownRef = useRef();
  const dispatch = useDispatch();
  const sortValue = useSelector((state) => state.sort);
  const handleChooseType = (type) => {
    dispatch(sortby(type));
    setPopup(false);
  };

  useClickOutside(dropDownRef, setPopup);
  useEffect(() => {
    dispatch(sortby("Latest"));
  }, []);
  console.log(sortValue);
  return (
    <div className="w-fit flex items-center gap-2">
      <span className="flex gap-2 items-center font-bold outline-none w-fit border-[1px] rounded p-2 px-4 border-slate-300 hover:border-slate-600">
        <SortIcon sx={{ fontSize: 20 }} /> <span>Sort by</span>
      </span>
      <button
        ref={dropDownRef}
        onClick={() => setPopup(!popup)}
        className="relative flex justify-between items-start outline-none w-[200px] border-[1px] rounded p-2 px-4 border-slate-300"
      >
        {popup && (
          <ul className="absolute top-12 left-0 bg-white lightShadow w-full p-2 text-left">
            <li
              onClick={() => handleChooseType("Latest")}
              className="p-2 px-4 hover:bg-slate-300"
            >
              Latest
            </li>
            <li
              onClick={() => handleChooseType("Oldest")}
              className="p-2 px-4 hover:bg-slate-300"
            >
              Oldest
            </li>
            <li
              onClick={() => handleChooseType("Descending")}
              className="p-2 px-4 hover:bg-slate-300"
            >
              Descending
            </li>
            <li
              onClick={() => handleChooseType("Ascending")}
              className="p-2 px-4 hover:bg-slate-300"
            >
              Ascending
            </li>
          </ul>
        )}

        <span>{sortValue}</span>
        <ArrowDropDownIcon />
      </button>
    </div>
  );
};
