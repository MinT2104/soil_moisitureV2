import React from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export const ActionToListProject = ({
  handlePopupAddAvailable,
  handlePopupAddNew,
  setFilterName,
  filterName,
}) => {
  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between p-4 overflow-auto">
        <div className="border-[1px] items-center px-4 border-slate-400 md:w-1/3 ww-full flex rounded overflow-hidden">
          <SearchIcon className="w-full " />
          <input
            defaultValue={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="dark:text-black p-4 py-2 w-full outline-none italic"
            placeholder="Filter By Project's Name "
            alt=""
          />
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={handlePopupAddNew}
            className="py-2 color-Primary text-white font-light rounded px-4 flex items-center"
          >
            Create Project
          </button>
          <button
            onClick={handlePopupAddAvailable}
            className="py-2 color-Primary text-white font-light rounded px-4 flex items-center"
          >
            Available Project
          </button>
        </div>
      </div>

      <hr />
    </section>
  );
};
