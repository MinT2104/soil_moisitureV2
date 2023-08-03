import apiProjectService from "../services/ApiProjectService";
import { useLayoutEffect } from "react";
import { login } from "../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
export const useGetUser = (loadUser) => {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state);
  useLayoutEffect(() => {
    const getData = async () => {
      apiProjectService
        .post(`/user/getauser`, { uid: userRedux.user?.uid })
        .then((res) => dispatch(login(res.data)));
    };
    getData();
  }, [loadUser]);

  return;
};
