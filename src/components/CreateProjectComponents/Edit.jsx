import React from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useRef } from "react";
import SelectField from "./SelectField";
import apiProjectService from "../../services/ApiProjectService";

export const Edit = ({ isEdit, setIsEdit }) => {
  const { allSenSorValue, setLoadCreation, loadCreation } =
    useContext(AppContext);
  const [isPopupEditdetail, setIsPopupEditDetail] = useState({});
  const [projectChose, setProjectChose] = useState("");
  const inputRef = useRef();

  const handlePopupEdit = (type, name, placeholder) => {
    setIsPopupEditDetail({ isOpen: true, name, type, placeholder });
  };
  const handleSubmit = () => {
    if (isPopupEditdetail?.type === "default") {
      if (inputRef.current?.value !== "") {
        if (isPopupEditdetail?.name === "projectName") {
          try {
            apiProjectService.put(`projects/${isEdit.data?.pid}`, {
              projectName: inputRef.current?.value,
            });
            setIsPopupEditDetail({ isOpen: false });
            setLoadCreation(!loadCreation);
          } catch (error) {
            console.log(error);
          }
        }
        if (isPopupEditdetail?.name === "depth_level_1") {
          try {
            apiProjectService.put(`projects/${isEdit.data?.pid}`, {
              depth_level_1: inputRef.current?.value,
            });
            setIsPopupEditDetail({ isOpen: false });
            setLoadCreation(!loadCreation);
          } catch (error) {
            console.log(error);
          }
        }
        if (isPopupEditdetail?.name === "depth_level_2") {
          try {
            apiProjectService.put(`projects/${isEdit.data?.pid}`, {
              depth_level_1: inputRef.current?.value,
            });
            setIsPopupEditDetail({ isOpen: false });
            setLoadCreation(!loadCreation);
          } catch (error) {
            console.log(error);
          }
        }
      }
      setIsPopupEditDetail({ isOpen: false });
      inputRef.current.value = "";
    } else {
      if (projectChose !== "") {
        try {
          apiProjectService.put(`projects/${isEdit.data?.pid}`, {
            type: projectChose,
          });
          setIsPopupEditDetail({ isOpen: false });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  console.log(projectChose);
  return (
    <div className="dark:text-black shadow-xl animate-opacity absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
      {isPopupEditdetail?.isOpen === true &&
        isPopupEditdetail?.type === "default" && (
          <div className=" absolute w-full h-full z-50 flex items-center justify-center">
            <div
              onClick={() => setIsPopupEditDetail({ isOpen: false })}
              className="absolute top-0 left-0 w-full bg-black opacity-50 h-screen z-[0] "
            ></div>
            <div className="rounded w-1/3 p-4 bg-white h-fit z-50 flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="text-white color-Primary p-2 px-4 rounded "
                >
                  Update
                </button>
                <button
                  onClick={() => setIsPopupEditDetail({ isOpen: false })}
                  className="rounded border-[1px] border-slate-400 p-2 px-4"
                >
                  cancel
                </button>
              </div>
              <div>
                <input
                  ref={inputRef}
                  className="w-full rounded border-[1px] border-black p-4 outline-none"
                  type="text"
                  placeholder={isPopupEditdetail?.placeholder}
                />
              </div>
            </div>
          </div>
        )}
      {isPopupEditdetail?.isOpen === true &&
        isPopupEditdetail?.type === "device" && (
          <div className=" absolute w-full h-full z-50 flex items-center justify-center">
            <div
              onClick={() => setIsPopupEditDetail({ isOpen: false })}
              className="absolute top-0 left-0 w-full bg-black opacity-50 h-screen z-[0] "
            ></div>
            <div className="rounded w-1/3 p-4 bg-white h-fit z-50 flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="text-white color-Primary p-2 px-4 rounded "
                >
                  Update
                </button>
                <button
                  onClick={() => setIsPopupEditDetail({ isOpen: false })}
                  className="rounded border-[1px] border-slate-400 p-2 px-4"
                >
                  cancel
                </button>
              </div>
              <SelectField
                setProjectChose={setProjectChose}
                projectChose={projectChose}
              />
            </div>
          </div>
        )}
      <div
        onClick={() => setIsEdit(false)}
        className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-[0] "
      ></div>
      <div className="p-10 w-3/5 h-fit bg-white z-40 relative rounded-xl">
        <table className="h-fit w-full border-[1px] border-slate-400 ">
          <tbody className="">
            <tr className="w-full  even:bg-slate-200">
              <td className="p-4 px-4 text-left w-1/2 font-semibold text-sm">
                Name
              </td>
              <td className="relative border-l-[1px] border-slate-300 p-4 px-4 text-left w-1/2 font-light text-sm">
                <div
                  onClick={() =>
                    handlePopupEdit(
                      "default",
                      "projectName",
                      "Update Project's Name"
                    )
                  }
                  className="absolute top-3 right-4"
                >
                  <EditIcon className="hover:text-black text-gray-500 duration-500 cursor-pointer" />
                </div>
                <span className="break-all"> {isEdit.data?.projectName}</span>
              </td>
            </tr>
            <tr className="w-full even:bg-slate-200">
              <td className="p-4 px-4 text-left w-1/2 font-semibold text-sm">
                Device
              </td>
              <td className="relative border-l-[1px] border-slate-300 p-4 px-4 text-left w-1/2 font-light text-sm">
                <div
                  onClick={() =>
                    handlePopupEdit("device", "type", "Update Project's Device")
                  }
                  className="absolute top-3 right-4"
                >
                  <EditIcon className="hover:text-black text-gray-500 duration-500 cursor-pointer" />
                </div>
                {isEdit.data?.type}
              </td>
            </tr>
            <tr className="w-full even:bg-slate-200">
              <td className="p-4 px-4 text-left w-1/2 font-semibold text-sm">
                Depth level 1
              </td>
              <td className="relative border-l-[1px] border-slate-300 p-4 px-4 text-left w-1/2 font-light text-sm">
                <div
                  onClick={() =>
                    handlePopupEdit(
                      "default",
                      "depth_level_1",
                      "Update Project's Depth level 1"
                    )
                  }
                  className="absolute top-3 right-4"
                >
                  <EditIcon className="hover:text-black text-gray-500 duration-500 cursor-pointer" />
                </div>
                {isEdit.data?.depth_level_1 || (
                  <span className="text-red-500">Null</span>
                )}
              </td>
            </tr>
            <tr className="w-full even:bg-slate-200">
              <td className="p-4 px-4 text-left w-1/2 font-semibold text-sm">
                Depth level 2
              </td>
              <td className="relative border-l-[1px] border-slate-300 p-4 px-4 text-left w-1/2 font-light text-sm">
                <div
                  onClick={() =>
                    handlePopupEdit(
                      "default",
                      "depth_level_2",
                      "Update Project's Depth level 2"
                    )
                  }
                  className="absolute top-3 right-4"
                >
                  <EditIcon className="hover:text-black text-gray-500 duration-500 cursor-pointer" />
                </div>
                {isEdit.data?.depth_level_ || (
                  <span className="text-red-500">Null</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
