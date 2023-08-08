import React, { useEffect, useState, useLayoutEffect } from "react";
import apiProjectService from "../../services/ApiProjectService";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useAllProject } from "../../hooks/useAllProject";
import { useAllUserRain } from "../../hooks/useAllUserRain";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { ExportCSV } from "../ExportCSV/ExportCSV";

export const AllRainFall = ({
  loadAllRain,
  setChooseDetail,
  chooseDetail,
  loadCreation,
}) => {
  const userRedux = useSelector((state) => state);
  const { allRain } = useAllUserRain(loadAllRain, userRedux);
  const { allProjects } = useAllProject(userRedux, loadCreation);

  const relatedToProject = (id) => {
    return allProjects.map((data) => {
      if (data.pid === id) {
        return data.projectName;
      }
    });
  };

  return (
    <>
      <table className="styled-table animate-opacity min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="animate-opacity">
          <tr className="text-slate-600 font-light text-left">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Install Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Related to Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Export
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="animate-opacity">
          {!allRain[0] ? (
            <tr>
              <td
                className="px-6 py-4 whitespace-nowrap uppercase text-sm text-red-500 dark:text-gray-200 text-center"
                colSpan={8}
              >
                No data
              </td>
            </tr>
          ) : (
            Array.from(allRain).map((data, index) => (
              <tr
                className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                key={index}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                  {data?.espName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {moment(data?.created_at).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {relatedToProject(data.pid)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  <button
                    onClick={() => setChooseDetail(data.pid)}
                    className="px-4 p-2 color-Primary rounded text-white"
                  >
                    Open
                  </button>
                </td>
                <td>
                  <ExportCSV
                    dataID={data?.pid}
                    name={data?.espName}
                    path={"/rain/getallfeed"}
                  />
                </td>
                <td className="text-center relative animate-slideUp">
                  <MoreHorizIcon className="bg-slate-200 rounded-full cursor-pointer dark:bg-transparent" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};
