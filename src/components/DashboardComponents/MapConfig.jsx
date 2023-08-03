import Map, { Marker } from "react-map-gl";
import { AppContext } from "../../context/AppContext";
import { useContext, useLayoutEffect, useEffect, useState } from "react";
// import { UserAuth } from "../../context/AuthContext";
import { MAPBOX_token } from "../../constant/constant";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import PushPinIcon from "@mui/icons-material/PushPin";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import apiProjectService from "../../services/ApiProjectService";

import "mapbox-gl/dist/mapbox-gl.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { TableData } from "../tableData/TableData";
import { setCurrentProject } from "../../redux/reducer/currentProjectSlice";
const MapConfig = ({ loadMap, setLoadMap, viewport, setIsOpenChart }) => {
  const { allProjects, loading, setLoading } = useContext(AppContext);
  const userRedux = useSelector((state) => state);
  const dispatch = useDispatch();
  const [popup, setPopup] = useState({
    isOpen: false,
    indexPopup: NaN,
  });
  const [isPin, setIspin] = useState(false);
  const handlePopupDetail = (data) => {
    dispatch(setCurrentProject(data));
    setLoading(!loading);
  };
  useLayoutEffect(() => {
    setLoadMap(false);
  }, [loadMap]);

  const handleOpenChart = () => {
    setIsOpenChart(true);
  };
  return (
    <Map
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={MAPBOX_token}
    >
      {isPin &&
        allProjects?.map((data, index) => (
          <div className="relative " key={index}>
            {popup.isOpen && popup.indexPopup === index && (
              <div className="absolute animate-opacity top-1 left-1 bg-white w-[400px] h-fit pb-2 rounded">
                <div
                  onClick={handleOpenChart}
                  className="cursor-pointer absolute gap-2 flex text-white color-Primary w-fit  p-2 rounded -bottom-12 items-center right-0"
                >
                  <span>Open Chart</span>
                  <SsidChartIcon />
                </div>
                <div className="cursor-default">
                  <div className="rounded flex items-center justify-between w-full color-Primary text-white text-xl font-bold text-center p-2">
                    <div className="flex gap-4 px-4 items-center">
                      <span>{data?.projectName}</span>
                      {/* <span className="uppercase"> Information</span> */}
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="relative">
                        <div className="absolute w-0.5 h-full bg-red-500 z-50 rotate-45 left-2"></div>
                        <PushPinIcon
                          onClick={() => setIspin(false)}
                          className="cursor-pointer hover:text-slate-200 -rotate-45"
                        />
                      </div>

                      <CloseIcon
                        onClick={() =>
                          setPopup({
                            isOpen: false,
                            indexPopup: NaN,
                          })
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <TableData data={data} />
                </div>
              </div>
            )}
            <Marker
              onClick={() =>
                setPopup({
                  isOpen: true,
                  indexPopup: index,
                })
              }
              latitude={data.latitude}
              longitude={data.longitude}
              color="blue"
              style={{
                cursor: "pointer",
                display: "relative",
              }}
            >
              <div className="w-6 h-6 rounded-full bg-blue-500 border-[1px] border-slate-600"></div>
            </Marker>
          </div>
        ))}
      {!isPin &&
        allProjects?.map((data, index) => (
          <div className="relative " key={index}>
            <Marker
              onClick={() => {
                dispatch(setCurrentProject(data));
                setPopup({
                  isOpen: true,
                  indexPopup: index,
                });
              }}
              latitude={data.latitude}
              longitude={data.longitude}
              color="blue"
              style={{
                cursor: "pointer",
                display: "relative",
              }}
            >
              <div className="w-6 h-6 rounded-full bg-blue-500 border-[1px] border-slate-600"></div>
              {popup.isOpen && popup.indexPopup === index && (
                <div className="absolute animate-opacity top-10 -left-48 bg-white w-[400px] h-fit pb-2 rounded">
                  <div
                    onClick={handleOpenChart}
                    className="absolute gap-2 flex text-white color-Primary w-fit  p-2 rounded -top-12 items-center right-0"
                  >
                    <span>Open Chart</span>
                    <SsidChartIcon />
                  </div>

                  <PlayArrowIcon className="absolute -rotate-90 -top-[16px] left-48 text-blue-500" />
                  <div className="cursor-default">
                    <div className="rounded flex items-center justify-between w-full color-Primary text-white text-xl font-bold text-center p-4">
                      <div className="flex gap-4 items-center">
                        <span>{data?.projectName}</span>
                        {/* <span className="uppercase"> Information</span> */}
                      </div>
                      <div className="flex gap-4 items-center">
                        <PushPinIcon
                          onClick={() => setIspin(true)}
                          className="cursor-pointer hover:text-slate-200 -rotate-45"
                        />
                        <CloseIcon
                          onClick={() =>
                            setPopup({
                              isOpen: false,
                              indexPopup: NaN,
                            })
                          }
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <TableData />
                  </div>
                </div>
              )}
            </Marker>
          </div>
        ))}
    </Map>
  );
};

export default MapConfig;
