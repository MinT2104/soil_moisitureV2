import { CopyToClipboard } from "react-copy-to-clipboard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import moment from "moment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { toast } from "react-toast";
import apiProjectService from "../../services/ApiProjectService";

import { useState, useContext, useEffect, useRef, memo } from "react";
import { AppContext } from "../../context/AppContext";
import { ThreeDotMobile } from "./ThreeDotMobile";
import { useClickOutside } from "../../hooks/useClickOutside";
import { CSVLink } from "react-csv";
import { ExportCSV } from "../ExportCSV/ExportCSV";
const AllProjects = ({
  setPopupConfirm,
  setPopupDel,
  loadAllProject,
  setIsEdit,
  filterName,
  currentProject,
}) => {
  const dropDownRef = useRef(null);
  const { allProjects } = useContext(AppContext);
  const [threeDot, setThreeDot] = useState({});
  const [isEsp, setIsEsp] = useState(false);
  const [isPump, setIsPump] = useState(false);
  const [copy, setCopy] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loadAll, setLoadAll] = useState(false);
  const [dataExport, setDataExport] = useState([]);

  useEffect(() => {
    setLoadAll(!loadAll);
  }, [loadAllProject]);

  const handleFilterSearch = (e) => {
    setInputValue(e.target?.value);
  };
  const handlePopupThreeDot = async (index, data) => {
    setThreeDot({
      isPopup: true,
      index: index,
    });
    setIsEsp(data.isEsp);
    setIsPump(data.isPump);
  };
  const handleCloseThreeDot = () => {
    setThreeDot({
      isPopup: false,
      index: undefined,
    });
  };
  const handleSuccessfullCopy = () => {
    toast.success(`Copy successfully!`, {
      backgroundColor: "green",
      color: "#ffffff",
      position: "top-right",
      delay: 2000,
    });
  };
  const filterByName = Array.from(allProjects).filter((data) => {
    if (data?.projectName.toLowerCase().includes(filterName.toLowerCase())) {
      return data;
    } else return null;
  });
  useClickOutside(dropDownRef, setThreeDot);

  return (
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
            Esp status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Pumps status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Depth level 1
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Depth level 2
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Export
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Get ID
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="animate-opacity">
        {allProjects[0] === false ? (
          <tr>
            <td
              className="px-6 py-4 whitespace-nowrap uppercase text-sm text-red-500 dark:text-gray-200 text-center"
              colSpan={9}
            >
              Project is not available
            </td>
          </tr>
        ) : (
          Array.from(filterByName).map((data, index) => (
            <tr
              className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
              key={index}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                {data?.projectName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {moment(data?.created_at).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {data?.isEsp ? (
                  <span className="text-green-600 bg-green-200 p-2 rounded">
                    Active
                  </span>
                ) : (
                  <span className="text-orange-600 bg-orange-200 p-2 rounded">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {data?.isPump ? (
                  <span className="text-green-600 bg-green-200 p-2 rounded">
                    Active
                  </span>
                ) : (
                  <span className="text-orange-600 bg-orange-200 p-2 rounded">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {data?.depth_level_1 ? (
                  data?.depth_level_1
                ) : (
                  <span className="text-red-500">_ _</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {data?.depth_level_2 ? (
                  data?.depth_level_2
                ) : (
                  <span className="text-red-500">_ _</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                <ExportCSV
                  dataID={data?.pid}
                  name={data?.projectName}
                  path={"/esp_sensor/getallfeed"}
                />
              </td>
              <td>
                <CopyToClipboard
                  currentProject={currentProject}
                  text={copy}
                  onCopy={() => setCopy(data?.pid)}
                >
                  <button
                    onDoubleClick={handleSuccessfullCopy}
                    className="px-4 py-1 text-white color-Primary rounded outline-none text-[12px] w-28 md:text-sm"
                  >
                    Double Click
                  </button>
                </CopyToClipboard>
              </td>
              <td
                ref={dropDownRef}
                className="text-center relative animate-slideUp"
              >
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
                    <div
                      ref={dropDownRef}
                      className="z-50 md:flex hidden animate-opacity strongShadow w-[170px] p-1 h-fit absolute top-14 -right-2 bg-white rounded gap-2"
                    >
                      <ul className="w-full h-full dark:text-white dark:bg-[#2a213a] z-50">
                        <li className="cursor-pointer border-b-[0.5px] border-slate-400 ">
                          <button
                            onClick={() => {
                              setPopupConfirm({
                                isPopup: true,
                                text: "Create new Esp?",
                                data: data,
                                setFor: "esp",
                              });
                              setThreeDot({
                                isPopup: false,
                                index: undefined,
                              });
                            }}
                            className={`hover:bg-slate-200 h-full w-full py-2 ${
                              isEsp
                                ? "bg-slate-200 dark:text-black"
                                : "bg-white"
                            }`}
                            disabled={isEsp ? true : false}
                          >
                            Create Esp
                          </button>
                        </li>
                        <li className="cursor-pointer border-b-[0.5px] border-slate-400">
                          <button
                            onClick={() => {
                              setPopupConfirm({
                                isPopup: true,
                                text: "Create new Pumps?",
                                data: data,
                                setFor: "pump",
                              });
                              setThreeDot({
                                isPopup: false,
                                index: undefined,
                              });
                            }}
                            className={` h-full w-full py-2 ${
                              isPump
                                ? "bg-slate-200 dark:text-black"
                                : "bg-white dark:text-white dark:bg-[#2a213a] dark:hover:bg-slate-200"
                            }`}
                            disabled={isPump ? true : false}
                          >
                            Create Pumps
                          </button>
                        </li>
                        <li
                          onClick={() => {
                            setIsEdit({ isPopup: true, data });
                            setThreeDot({
                              isPopup: false,
                              index: undefined,
                            });
                          }}
                          className="py-2 hover:bg-slate-200 dark:hover:text-black cursor-pointer border-b-[0.5px] border-slate-400"
                        >
                          Edit
                        </li>
                        <li className="py-2 hover:bg-slate-200 dark:hover:text-black cursor-pointer">
                          <button
                            onClick={() => {
                              setPopupDel({ isPopup: true, data: data });
                              setThreeDot({
                                isPopup: false,
                                index: undefined,
                              });
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                    <ThreeDotMobile
                      handleCloseThreeDot={handleCloseThreeDot}
                      setThreeDot={setThreeDot}
                      isEsp={isEsp}
                      isPump={isPump}
                      data={data}
                      setPopupConfirm={setPopupConfirm}
                      setPopupDel={setPopupDel}
                    />
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
export default memo(AllProjects);
