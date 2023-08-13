import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { AppContext } from "../context/AppContext";
import { useContext, useRef } from "react";
import NavBar from "../components/NavBar.js/NavBar";
import MobBar from "../components/NavBar.js/MobBar";
import apiProjectService from "../services/ApiProjectService";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ToastContainer, toast } from "react-toast";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import AllProjects from "../components/CreateProjectComponents/AllProjects";
import AddAvailable from "../components/CreateProjectComponents/AddAvailable";
import { AddnewPopup } from "../components/CreateProjectComponents/AddnewPopup";
import { PopupConfirm } from "../components/CreateProjectComponents/PopupConfirm";
import { PopupDel } from "../components/CreateProjectComponents/PopupDel";
import { ActionToListProject } from "../components/CreateProjectComponents/ActionToListProject";
import { ActionToListProjectMob } from "../components/CreateProjectComponents/ActionToListProjectMob";
import { Edit } from "../components/CreateProjectComponents/Edit";
import { DefaultLayout } from "../layouts/DefaultLayout";
import moment from "moment";

const ProjectManagement = () => {
  const {
    loadCreation,
    setLoadCreation,
    loadUser,
    setLoadUser,
    isOpenSideBar,
    setIsOpenSideBar,
  } = useContext(AppContext);
  const availableRef = useRef();
  const userRedux = useSelector((state) => state);
  const [projectChose, setProjectChose] = useState("");
  const [projectName, setProjectName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errState, setErrState] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [popupConfirm, setPopupConfirm] = useState({
    isPopup: false,
    text: "",
    data: {},
    setFor: "",
  });
  const [popupDel, setPopupDel] = useState({ isPopup: false, data: {} });
  const [redBorder, setRedBorder] = useState({});
  const [foundProject, setFoundProject] = useState([]);
  const [addNewPopup, setAddNewPopup] = useState(false);
  const [isAddAvailable, setIsAddAvailable] = useState(false);
  const [loadAllProject, setLoadAllProject] = useState(false);
  const [isEdit, setIsEdit] = useState({ isPopup: false, data: {} });
  const [filterName, setFilterName] = useState("");
  // const headers = {
  //   Authorization: `Bearer ${userRedux.user?.accessToken}`,
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      projectName !== "" &&
      longitude !== "" &&
      latitude !== "" &&
      projectChose !== ""
    ) {
      if (
        +longitude < 360 &&
        +longitude > 0 &&
        +latitude < 90 &&
        +latitude > -90
      ) {
        try {
          if (projectName) {
            const newProject = {
              pid: v4(),
              type: projectChose,
              created_at: moment(new Date()),
              projectName: projectName,
              humidLevel: 50,
              manualWatering: false,
              autoWatering: false,
              AIWatering: false,
              isPump: false,
              isEsp: false,
              latitude: latitude,
              longitude: longitude,
              rainFall: "",
              depth_level_1: "",
              depth_level_2: "",
            };

            apiProjectService.post("/projects", newProject).then((res) => {
              setTimeout(() => {
                toast.success(`Create successfully!`, {
                  backgroundColor: "green",
                  color: "#ffffff",
                  position: "top-right",
                  delay: 2000,
                });
              }, 1000);
              apiProjectService
                .put(`/user/update_props`, {
                  uid: userRedux.user?.uid,
                  projectAmount: userRedux.user?.projectAmount + 1,
                })
                .then((res) => setLoadUser(!loadUser));
            });
            apiProjectService
              .put(`/user/update_pid`, {
                uid: userRedux.user?.uid,
                pid: newProject.pid,
              })
              .then((res) => {
                setLoadCreation(!loadCreation);
                setLoadAllProject(!loadAllProject);
                setAddNewPopup(false);
              });
            // console.log(newProject);
          } else {
            setErrState(true);
            setTimeout(() => {
              setErrState(false);
            }, [5000]);
          }
        } catch (error) {
          console.log(error);
        }
        setProjectName("");
        setLongitude("");
        setLatitude("");
        setProjectChose("");
      }
    } else {
      setEmptyInput(true);
      setTimeout(() => {
        setEmptyInput(false);
      }, [5000]);
    }
    setProjectName("");
    setLongitude("");
    setProjectChose("");
    setLatitude("");
  };

  const handleCreateEsp = async (data) => {
    try {
      await apiProjectService.post("/esp_sensor", {
        uid: userRedux.user?.uid,
        pid: data.pid,
        created_at: Date(),
        feeds: [],
      });
      await apiProjectService
        .put(`/projects/${data.pid}`, {
          isEsp: true,
        })
        .then((res) => {
          apiProjectService
            .put(`/user/update_props`, {
              uid: userRedux.user?.uid,
              espAmount: userRedux.user?.espAmount + 1,
            })
            .then((res) => setLoadUser(!loadUser));
          setPopupConfirm({ isPopup: false, text: "", data: {}, setFor: "" });
          setLoadCreation(!loadCreation);
          setLoadAllProject(!loadAllProject);
          toast.success(`Create successfully!`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          });
        });
    } catch (error) {
      throw error;
    }
  };
  const handleCreatePump = async (data) => {
    try {
      await apiProjectService.post("/pump", {
        pid: data.pid,
        pumpName: data.projectName,
        value: 0,
      });
      await apiProjectService
        .put(`/projects/${data.pid}`, {
          isPump: true,
        })
        .then((res) => {
          apiProjectService
            .put(`/user/update_props`, {
              uid: userRedux.user?.uid,
              pumpAmount: userRedux.user?.pumpAmount + 1,
            })
            .then((res) => setLoadUser(!loadUser));
          setPopupConfirm({ isPopup: false, text: "", data: {}, setFor: "" });
          setLoadCreation(!loadCreation);
          setLoadAllProject(!loadAllProject);
          toast.success(`Create successfully!`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          });
        });
    } catch (error) {
      throw error;
    }
  };
  const handleFindProject = (e) => {
    setFoundProject([]);
    e.preventDefault();
    if (availableRef.current.value) {
      try {
        apiProjectService
          .get(`/projects/${availableRef.current.value}`)
          .then((res) => {
            setFoundProject(res.data);
          })
          .catch((error) => {
            setRedBorder({ isRed: true, message: error.response.data });
            setTimeout(() => {
              setRedBorder({});
            }, 5000);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setRedBorder({ isRed: true, message: "Invalid ID" });
      setTimeout(() => {
        setRedBorder({});
      }, 3000);
    }
  };
  const handleDeleteProject = (data) => {
    try {
      apiProjectService
        .put(`/user/deluserpid`, {
          uid: userRedux.user?.uid,
          pid: data.pid,
        })
        .then((res) => {
          apiProjectService
            .put(`/user/update_props`, {
              uid: userRedux.user?.uid,
              projectAmount: userRedux.user?.projectAmount - 1,
            })
            .then((res) => setLoadUser(!loadUser));
          setLoadCreation(!loadCreation);
          setLoadAllProject(!loadAllProject);
          setLoadUser(!loadUser);
          toast.success(`${res.data}!`, {
            backgroundColor: "green",
            color: "#ffffff",
            position: "top-right",
            delay: 2000,
          });
        });
      setPopupDel({ isPopup: false, data: {} });
    } catch (error) {
      throw error;
    }
  };
  const handleAddProject = async () => {
    try {
      const res = await apiProjectService.get(
        `/projects/${availableRef.current.value}`
      );
      const isTheSame = userRedux.user.multiProject?.filter(
        (data) => data === res.data[0].pid
      );
      if (isTheSame?.length === 0) {
        try {
          apiProjectService
            .put("/user/update_pid", {
              uid: userRedux.user?.uid,
              pid: res.data[0]?.pid,
            })
            .then((res) => {
              apiProjectService
                .put(`/user/update_props`, {
                  uid: userRedux.user?.uid,
                  projectAmount: userRedux.user?.projectAmount + 1,
                })
                .then((res) => setLoadUser(!loadUser));
              setLoadCreation(!loadCreation);
              setLoadAllProject(!loadAllProject);
              setIsAddAvailable(false);
              setFoundProject([]);
              toast.success(`${res.data}!`, {
                backgroundColor: "green",
                color: "#ffffff",
                position: "top-right",
                delay: 2000,
              });
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("You already have this project!", {
          backgroundColor: "red",
          color: "#ffffff",
          position: "top-right",
          delay: 2000,
        });
      }
    } catch (error) {
      toast.error(`Somthing's wrong!`, {
        backgroundColor: "green",
        color: "#ffffff",
        position: "top-right",
        delay: 2000,
      });
    }

    // console.log(res.data[0].pid)
  };
  const handlePopupAddNew = () => {
    setAddNewPopup(true);
  };
  const handleClosePopupAddNew = () => {
    setAddNewPopup(false);
  };
  const handlePopupAddAvailable = () => {
    setIsAddAvailable(true);
  };
  const handleClosePopupAddAvailable = () => {
    setIsAddAvailable(false);
    setFoundProject([]);
  };
  useEffect(() => {
    setIsOpenSideBar(false);
  }, []);
  return (
    <DefaultLayout title="Projects Management">
      {popupDel?.isPopup && (
        <PopupDel
          setPopupDel={setPopupDel}
          handleDeleteProject={handleDeleteProject}
          popupDel={popupDel}
        />
      )}
      {popupConfirm?.isPopup && (
        <PopupConfirm
          popupConfirm={popupConfirm}
          setPopupConfirm={setPopupConfirm}
          handleCreateEsp={handleCreateEsp}
          handleCreatePump={handleCreatePump}
        />
      )}
      {isEdit?.isPopup === true && (
        <Edit isEdit={isEdit} setIsEdit={setIsEdit} />
      )}
      {addNewPopup && (
        <AddnewPopup
          projectChose={projectChose}
          setProjectChose={setProjectChose}
          handleClosePopupAddNew={handleClosePopupAddNew}
          handleSubmit={handleSubmit}
          emptyInput={emptyInput}
          projectName={projectName}
          setProjectName={setProjectName}
          latitude={latitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          longitude={longitude}
        />
      )}
      {isAddAvailable && (
        <AddAvailable
          setFoundProject={setFoundProject}
          handleClosePopupAddAvailable={handleClosePopupAddAvailable}
          redBorder={redBorder}
          availableRef={availableRef}
          foundProject={foundProject}
          handleAddProject={handleAddProject}
          handleFindProject={handleFindProject}
        />
      )}
      {isOpenSideBar && <MobBar isOpenSideBar={isOpenSideBar} />}
      <div className="animate-slideInToLeft md:animate-opacity dark:bg-slate-900 dark:text-white z-0 w-full bg-[#f2f2f2] h-full flex items-center justify-start gap-2 flex-col">
        <ToastContainer delay={3000} />
        <div className="animate-opacity w-full h-full p-2 md:p-2 pb-0 overflow-auto z-0">
          <ActionToListProjectMob
            handlePopupAddAvailable={handlePopupAddAvailable}
            handlePopupAddNew={handlePopupAddNew}
          />
          <div className="dark:bg-[#2a213a] rounded dark:text-white w-full h-fit bg-white shadow-main ">
            <ActionToListProject
              filterName={filterName}
              setFilterName={setFilterName}
              handlePopupAddAvailable={handlePopupAddAvailable}
              handlePopupAddNew={handlePopupAddNew}
            />
            <div className="w-full h-fit pb-6 overflow-x-auto md:overflow-x-clip">
              <AllProjects
                filterName={filterName}
                setIsEdit={setIsEdit}
                loadAllProject={loadAllProject}
                setPopupConfirm={setPopupConfirm}
                setPopupDel={setPopupDel}
                loadCreation={loadCreation}
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProjectManagement;
