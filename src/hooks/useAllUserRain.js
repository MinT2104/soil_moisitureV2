import { memo, useLayoutEffect, useState } from "react";
import apiProjectService from "../services/ApiProjectService";

export const useAllUserRain = (loadAllRain, userRedux) => {
  const [allRain, setAllRain] = useState([]);

  useLayoutEffect(() => {
    const getData = async () => {
      apiProjectService
        .post("/rain/alluserrain", {
          uid: userRedux.user?.uid,
        })
        .then((res) => setAllRain(res.data))
        .catch((err) => console.log(err));
    };
    getData();
  }, [loadAllRain]);

  return { allRain };
};
