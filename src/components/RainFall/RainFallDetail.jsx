import moment from "moment";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { RainThreeDotMobile } from "./RainThreeDotMobile";
import { sortRainFall } from "../../utils/sortRainFall";
import { useSelector } from "react-redux";
import apiProjectService from "../../services/ApiProjectService";

export const RainFallDetail = ({
  chooseDetail,
  setPopupDel,
  setThreeDot,
  threeDot,
  setIsAddNew,
  setChooseDetailData,
  chooseDetailData,
  loading,
}) => {
  const sortValue = useSelector((state) => state.sort);
  const handlePopupThreeDot = async (index) => {
    setIsAddNew(false);
    setThreeDot({
      isPopup: true,
      index: index,
    });
  };
  const handleCloseThreeDot = (index) => {
    setThreeDot({
      isPopup: false,
      index: undefined,
    });
  };
  const handlePopupDelComfirm = (data) => {
    // console.log(data)
    setPopupDel({
      isPopup: true,
      data: data,
    });
    setThreeDot({
      isPopup: false,
      index: undefined,
    });
  };
  useEffect(() => {
    const getData = async () => {
      const data = await apiProjectService.post("/rain/getallfeed", {
        pid: chooseDetail,
      });
      setChooseDetailData(data.data);
    };
    getData();
  }, [chooseDetail, loading]);
  const sortData = sortRainFall(sortValue, chooseDetailData);
  console.log(chooseDetailData);
  return (
    <section className="p-4 pt-2 rounded border-[1px] border-slate-300">
      <table className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="animate-opacity text-black border-b-[1px] border-slate-300">
          <tr className="font-light text-left">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase" />
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Generated_date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
              Generated_time
            </th>
            <th className="px-6 py-3 text-xs font-medium uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="animate-opacity overflow-auto">
          {sortData?.map((data, index) => (
            <tr
              className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800 border-b-[1px] border-slate-300"
              key={index}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                {data?.field1 !== "NaN" ? data?.field1 + "mm" : data?.field1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {moment(data?.generated_date).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {moment(data?.generated_time).format("hh:mm:ss a")}
              </td>
              <td className="text-center relative">
                {threeDot?.isPopup === true && threeDot?.index === index ? (
                  <HighlightOffIcon
                    onClick={() => handleCloseThreeDot(index)}
                    className="bg-slate-200 rounded-full text-red-500 cursor-pointer dark:bg-transparent"
                  />
                ) : (
                  <MoreHorizIcon
                    onClick={() => handlePopupThreeDot(index, data)}
                    className="bg-slate-200 rounded-full cursor-pointer dark:bg-transparent"
                  />
                )}
                {threeDot.isPopup === true && threeDot.index === index && (
                  <>
                    <div className="md:block hidden z-50 animate-opacity strongShadow w-[170px] p-1 h-fit absolute top-14 -right-2 bg-white rounded gap-2">
                      <ul className="w-full h-full dark:text-white dark:bg-[#2a213a] z-50">
                        <li className="py-2 hover:bg-slate-200 dark:hover:text-black cursor-pointer border-b-[0.5px] border-slate-400">
                          Edit
                        </li>
                        <li
                          onClick={() => handlePopupDelComfirm(data)}
                          className="py-2 hover:bg-slate-200 dark:hover:text-black cursor-pointer"
                        >
                          <button>Delete</button>
                        </li>
                      </ul>
                    </div>
                    <RainThreeDotMobile
                      handlePopupDelComfirm={handlePopupDelComfirm}
                      data={data}
                      handleCloseThreeDot={handleCloseThreeDot}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
