import apiProjectService from "../services/ApiProjectService";
import { useState, useLayoutEffect, memo } from "react";
import { setCurrentProject } from "../redux/reducer/currentProjectSlice";
import { useDispatch } from "react-redux";

export const useAllProject = (userRedux, loadCreation) => {
  const dispatch = useDispatch();
  const [allProjects, setAllProjects] = useState([]);
  useLayoutEffect(() => {
    const getData = async () => {
      apiProjectService
        .post(`/user/getauser`, { uid: userRedux.user?.uid })
        .then((response) => {
          apiProjectService
            .post(`/projects/userproject`, {
              reqPid: response.data?.multiProject,
            })
            .then((res) => {
              setAllProjects(res.data);
              dispatch(setCurrentProject(res.data[0]));
            });
        });
    };
    getData();
  }, [loadCreation, userRedux.user?.uid]);
  // console.log("getallproject");

  return { allProjects };
};
