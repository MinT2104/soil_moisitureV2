import { createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAllProject } from "../hooks/useAllProject";
import { useGetUser } from "../hooks/useGetUser";
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const userRedux = useSelector((state) => state);
  const currentProject = useSelector((state) => state.currentProject);
  const [loading, setLoading] = useState(false);
  const [loadCreation, setLoadCreation] = useState(false);
  const [dayObjectChosen, setDayObjectChosen] = useState({});
  const [isChooseMapPopup, setIsChooseMapPopup] = useState(false);
  const [objectData, setObjectData] = useState({});
  const [loadDashboard, setLoadDasboard] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [projectchose, setProjectChose] = useState({
    projectName: "Choose Project",
  });
  const [allSenSorValue, setAllSenSorValue] = useState([]);
  const [allRain, setAllRain] = useState([]);

  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [reFreshChart, setReFreshChart] = useState(false);

  const { allProjects } = useAllProject(userRedux, loadCreation);
  useGetUser(loadUser);

  return (
    <AppContext.Provider
      value={{
        setReFreshChart,
        reFreshChart,
        setAllRain,
        allRain,
        // newSensorChange,
        setAllSenSorValue,
        allSenSorValue,
        allProjects,
        currentProject,
        setLoading,
        loading,
        loadUser,
        setLoadUser,
        setDayObjectChosen,
        dayObjectChosen,
        setIsChooseMapPopup,
        isChooseMapPopup,
        objectData,
        setObjectData,
        setLoadDasboard,
        loadDashboard,
        setLoadCreation,
        loadCreation,
        setProjectChose,
        projectchose,
        setIsOpenSideBar,
        isOpenSideBar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
