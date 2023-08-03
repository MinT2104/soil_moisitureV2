import React, { useEffect, useState, useLayoutEffect } from "react";
import apiProjectService from "../../services/ApiProjectService";
import { useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useAllProject } from "../../hooks/useAllProject";
import { useAllUserRain } from "../../hooks/useAllUserRain";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { CSVLink } from "react-csv";

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
          {Array.from(allRain).map((data, index) => (
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
                  onClick={() => setChooseDetail(data)}
                  className="px-4 p-2 color-Primary rounded text-white"
                >
                  Open
                </button>
              </td>
              <td>
                <CSVLink
                  data={data?.feeds}
                  filename="Rainfall"
                  className="px-4 p-2 flex w-fit items-center gap-2 color-Primary rounded text-white"
                >
                  <FileDownloadRoundedIcon sx={{ fontSize: 20 }} />
                  <span>Export</span>
                </CSVLink>
              </td>
              <td className="text-center relative animate-slideUp">
                <MoreHorizIcon className="bg-slate-200 rounded-full cursor-pointer dark:bg-transparent" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div
        className={`p-4 animate-slideDown flex flex-col gap-2 overflow-auto dark:text-black ${height}`}
      >
        {Array.from(allRain)?.map((data) => (
          <div
            key={data.pid}
            className={`${
              chooseDetail.pid === data.pid &&
              "bg-gray-300 dark:color-Primary dark:text-white"
            } dark:bg-white  animate-slideDown  w-full rounded flex items-center justify-between px-4  cursor-pointer hover:bg-gray-300 duration-500`}
          >
            <div className="flex gap-2 w-4/5">
              <input type="checkbox" alt="" />
              <span
                onClick={() => setChooseDetail(data)}
                className="w-24 p-4 font-bold inline-block truncate break-all "
              >
                {data?.espName}
              </span>
              <span
                onClick={() => setChooseDetail(data)}
                className="font-light p-4 truncate "
              >
                {moment(data.created_at).format("DD/MM/YY hh:mm")}
              </span>
            </div>
            <div>
              <MoreHorizIcon />
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
};
