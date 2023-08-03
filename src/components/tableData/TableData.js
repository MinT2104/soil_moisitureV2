import React, { useState, useLayoutEffect, useEffect } from "react";
import apiProjectService from "../../services/ApiProjectService";
import moment from "moment";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
export const TableData = ({ loadTable, setloadTable, data }) => {
  const { allSenSorValue, currentProject } = useContext(AppContext);
  const userRedux = useSelector((state) => state);
  const [projectRain, setProjectRain] = useState("");
  // console.log(projectRain);
  return (
    <table className="h-full w-full">
      <tbody className="">
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Name
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            <span className="break-all">
              {" "}
              {data?.projectName || currentProject?.projectName}
            </span>
          </td>
        </tr>
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Device
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {data?.type || currentProject?.type}
          </td>
        </tr>
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Date generated
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {moment(data?.created_at || currentProject?.created_at).format(
              "DD/MM/YYYY hh:mm a"
            )}
          </td>
        </tr>
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Depth level 1
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {data?.depth_level_1 || currentProject?.depth_level_1 || "Null"}
          </td>
        </tr>
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Depth level 2
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {data?.depth_level_2 || currentProject?.depth_level_2 || "Null"}
          </td>
        </tr>
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Humidty 1
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {(allSenSorValue[allSenSorValue?.length - 1]?.field1 !==
              undefined &&
              (
                (allSenSorValue[allSenSorValue?.length - 1]?.field1 /
                  (currentProject?.type === "Esp32" ? 4095 : 1023)) *
                3000
              ).toFixed(0)) ||
              "NaN"}
          </td>
        </tr>

        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Humidty 2
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {(allSenSorValue[allSenSorValue?.length - 1]?.field2 !==
              undefined &&
              (
                (allSenSorValue[allSenSorValue?.length - 1]?.field2 /
                  (currentProject?.type === "Esp32" ? 4095 : 1023)) *
                3000
              ).toFixed(0)) ||
              "NaN"}
          </td>
        </tr>
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Available Esp
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {data?.isEsp || currentProject?.isEsp ? (
              <span className="text-blue-600">Yes</span>
            ) : (
              <span className="text-red-400">No</span>
            )}
          </td>
        </tr>

        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Available Pumps
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {data?.isPump || currentProject?.isPump ? (
              <span className="text-blue-600">Yes</span>
            ) : (
              <span className="text-red-400">No</span>
            )}
          </td>
        </tr>
        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Pumps Status
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {data?.AIwatering ||
              (currentProject?.AIwatering && (
                <span className="text-blue-600">On by AI</span>
              ))}
            {data?.manualWatering ||
              (currentProject?.manualWatering && (
                <span className="text-blue-600">On by Manual</span>
              ))}
            {data?.autoWatering ||
              (currentProject?.autoWatering && (
                <span className="text-blue-600">On by Auto</span>
              ))}
            {!currentProject?.AIwatering &&
              !currentProject?.manualWatering &&
              !currentProject?.autoWatering &&
              "OFF"}
          </td>
        </tr>

        <tr className="w-full even:bg-slate-200 even:dark:text-black">
          <td className="p-2 px-4 text-left w-1/2 font-semibold text-sm">
            Rainfall
          </td>
          <td className="border-l-[1px] border-slate-300 p-2 px-4 text-left w-1/2 font-light text-sm">
            {data?.rainFall || currentProject?.rainFall || "NaN"}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
