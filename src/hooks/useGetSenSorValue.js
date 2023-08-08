// import apiProjectService from "../services/ApiProjectService";
// import { useLayoutEffect, useState } from "react";
// import { useSelector } from "react-redux";
// export const useGetSenSorValue = (reFreshChart) => {
//   const currentProject = useSelector((state) => state.currentProject);
//   const [newSensorChange, setNewSenSorChange] = useState([]);
//   const [allSenSorValue, setAllSenSorValue] = useState([]);

//   useLayoutEffect(() => {
//     const abortCtrl = new AbortController();
//     const Doc = async () => {
//       try {
//         if (currentProject?.pid) {
//           const response = await apiProjectService.get(
//             `esp_sensor/${currentProject.pid}`
//           );
//           setNewSenSorChange(
//             response.data?.feeds[response.data?.feeds.length - 1]?.field1
//           );
//           setAllSenSorValue(response.data?.feeds);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     Doc();

//     return () => {
//       abortCtrl.abort();
//     };
//   }, [currentProject, reFreshChart]);
//   //   console.log("getsensor");
//   return { newSensorChange, allSenSorValue };
// };
