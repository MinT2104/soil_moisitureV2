import Switch from "@mui/material/Switch";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import apiProjectService from "../../services/ApiProjectService";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toast";

const ButtonControl = ({ setloadTable, loadTable }) => {
  const userRedux = useSelector((state) => state);
  const { currentProject, loadDashboard, loadCreation } =
    useContext(AppContext);
  const [buttonChange, setButtonChange] = useState({});
  const [checker, setChecker] = useState({});
  const [firstValue, setFirstValue] = useState({});
  const [isPumpAvailable, setIsPumpAvailable] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  useEffect(() => {
    const getPump = async () => {
      const isPump = await apiProjectService.get(
        `/pump/${currentProject?.pid}`
      );
      if (isPump.data?.pid) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    };
    getPump();
  }, [loadDashboard, currentProject]);
  const handleChangeManual = async (event) => {
    setButtonChange({
      manualWatering: event.target.checked,
      autoWatering: false,
      AIWatering: false,
    });
    await apiProjectService.put(`/projects/${currentProject.pid}`, {
      manualWatering: event.target.checked,
      AIWatering: false,
      autoWatering: false,
    });
    if (event.target.checked) {
      await apiProjectService.put(`/pump/${currentProject.pid}`, { value: 1 });
      await apiProjectService.post(`/noti/addnew`, {
        pid: currentProject?.pid,
        projectName: currentProject?.projectName,
        uid: userRedux?.user.uid,
        message: "pumps is running right now! (manual watering)",
        isRead: false,
      });
    } else {
      await apiProjectService.put(`/pump/${currentProject.pid}`, { value: 0 });
      await apiProjectService.post(`/noti/addnew`, {
        pid: currentProject?.pid,
        projectName: currentProject?.projectName,
        uid: userRedux?.user.uid,
        message: "pumps was stopped! (manual watering)",
        isRead: false,
      });
    }
    loadCreation(!loadCreation);
    setloadTable(!loadTable);
  };
  const handleChangeAuto = async (event) => {
    setButtonChange({
      manualWatering: false,
      autoWatering: event.target.checked,
      AIWatering: false,
    });
    await apiProjectService.put(`/projects/${currentProject.pid}`, {
      autoWatering: event.target.checked,
      AIWatering: false,
      manualWatering: false,
    });
    if (event.target.checked) {
      await apiProjectService.put(`/pump/${currentProject.pid}`, { value: 2 });
      await apiProjectService.post(`/noti/addnew`, {
        pid: currentProject?.pid,
        projectName: currentProject?.projectName,
        uid: userRedux?.user.uid,
        message: "pumps is running right now! (auto watering)",
        isRead: false,
      });
    } else {
      await apiProjectService.put(`/pump/${currentProject.pid}`, { value: 0 });
      await apiProjectService.post(`/noti/addnew`, {
        pid: currentProject?.pid,
        projectName: currentProject?.projectName,
        uid: userRedux?.user.uid,
        message: "pumps was stopped! (auto watering)",
        isRead: false,
      });
    }
    loadCreation(!loadCreation);
    setloadTable(!loadTable);
  };
  const handleChangeAI = async (event) => {
    setButtonChange({
      manualWatering: false,
      autoWatering: false,
      AIWatering: event.target.checked,
    });
    await apiProjectService.put(`/projects/${currentProject.pid}`, {
      AIWatering: event.target.checked,
      manualWatering: false,
      autoWatering: false,
    });
    if (event.target.checked) {
      await apiProjectService.put(`/pump/${currentProject.pid}`, { value: 3 });
      await apiProjectService.post(`/noti/addnew`, {
        pid: currentProject?.pid,
        projectName: currentProject?.projectName,
        uid: userRedux?.user.uid,
        message: "pumps is running right now! (AI watering)",
        isRead: false,
      });
    } else {
      await apiProjectService.put(`/pump/${currentProject.pid}`, { value: 0 });
      await apiProjectService.post(`/noti/addnew`, {
        pid: currentProject?.pid,
        projectName: currentProject?.projectName,
        uid: userRedux?.user.uid,
        message: "pumps was stopped! (AI watering)",
        isRead: false,
      });
    }
    loadCreation(!loadCreation);
    setloadTable(!loadTable);
  };
  const handleAlert = () => {
    toast.error("You need to create a pump to use this!", {
      backgroundColor: "orange",
      color: "#ffffff",
      position: "top-right",
      delay: 4000,
    });
  };
  useEffect(() => {
    const getData = () => {
      apiProjectService
        .get(`/projects/${currentProject.pid}`)
        .then((res) => {
          setButtonChange(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setTimeout(() => {
      getData();
    }, 500);
  }, [currentProject]);
  return (
    <div className="dark:bg-slate-900 dark:text-white relative animate-opacity w-full lg:w-1/2 flex flex-row gap-1 justify-center items-center bg-transparent rounded">
      <ToastContainer delay={3000} />
      {isDisable && (
        <div
          onClick={handleAlert}
          className="absolute z-40 bg-gray-400 opacity-40 rounded w-full h-full top-0 left-0"
        ></div>
      )}

      <div className="dark:bg-[#2a213a] w-full md:w-1/3 flex flex-col items-center justify-center bg-white h-full rounded p-1">
        <span className="dark:text-white text-black font-bold text-[12px] md:text-[14px]">
          Manual Watering
        </span>
        <Switch
          disabled={isDisable}
          checked={buttonChange?.manualWatering || false}
          onClick={handleChangeManual}
        />
      </div>
      <div className="dark:bg-[#2a213a] w-full md:w-1/3 flex flex-col items-center justify-center bg-white h-full rounded p-1">
        <span className="dark:text-white text-black font-bold text-[12px] md:text-[14px]">
          Auto Watering
        </span>
        <Switch
          disabled={isDisable}
          checked={buttonChange?.autoWatering || false}
          onClick={handleChangeAuto}
        />
      </div>
      <div className="dark:bg-[#2a213a]  w-full md:w-1/3 flex flex-col items-center justify-center bg-white h-full rounded p-1">
        <span className=" dark:text-white font-bold text-[12px] md:text-[14px]">
          AI Watering
        </span>
        <Switch
          disabled={isDisable}
          onClick={handleChangeAI}
          checked={buttonChange?.AIWatering || false}
        />
      </div>
    </div>
  );
};

export default ButtonControl;
