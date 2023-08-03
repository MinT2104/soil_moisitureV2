import React from "react";
import SelectField from "./SelectField";

export const AddnewPopup = ({
  handleClosePopupAddNew,
  handleSubmit,
  emptyInput,
  projectName,
  setProjectName,
  setLatitude,
  latitude,
  longitude,
  setLongitude,
  projectChose,
  setProjectChose,
}) => {
  return (
    <div className="dark:text-black shadow-xl animate-opacity absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
      <div
        onClick={handleClosePopupAddNew}
        className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-[0] "
      ></div>
      <form
        onSubmit={handleSubmit}
        className="px-10 animate-opacity z-50 md:h-fit h-full w-full md:w-2/3 lg:w-1/3 bg-white flex flex-col justify-center items-center rounded gap-4 py-10"
      >
        <div className="font-bold text-xl text-black py-2 text-left">
          Create New Project
        </div>
        <div className="flex flex-col items-center w-full">
          {emptyInput && (
            <>
              <span className="text-red-600">All fields required </span>
            </>
          )}
        </div>
        <div className="p-4 rounded w-full mx-auto text-black  bg-gray-300">
          <input
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
            className="w-full bg-transparent outline-none"
            placeholder="Your Project's Name"
            alt=""
          />
        </div>
        <div className="p-4 rounded w-full mx-auto text-black  bg-gray-300">
          <input
            value={latitude}
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
            className="w-full bg-transparent outline-none"
            placeholder="Your latitude"
            alt=""
          />
        </div>
        <div className="p-4 rounded w-full mx-auto text-black bg-gray-300">
          <input
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
            value={longitude}
            className="w-full bg-transparent outline-none"
            placeholder="Your longitude"
            alt=""
          />
        </div>
        <SelectField
          projectChose={projectChose}
          setProjectChose={setProjectChose}
        />
        <div className="w-full h-fit flex justify-end gap-2">
          <button
            onClick={handleClosePopupAddNew}
            className="flex items-center font-light justify-center border-[1px] border-slate-400 text-center w-1/3 p-2 px-6 rounded text-black duration-300 ease-in cursor-pointer"
          >
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="flex items-center font-light justify-center text-center color-Primary w-1/3 p-2 px-6 rounded text-white duration-300 ease-in cursor-pointer"
          >
            <span>Confirm</span>
          </button>
        </div>

        {/* <Link className="text-blue-600 font-bold text-lg hover:scale-110 duration-300" to="/createproject">Sign Up</Link> */}
      </form>
    </div>
  );
};
