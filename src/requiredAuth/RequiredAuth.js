import { Outlet, Navigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";
import { useSelector } from 'react-redux';

const RequiredAuth = () => {
    const userRedux = useSelector(state=>state)

    // const {user} = UserAuth()
    return( userRedux?.user ? <Outlet/> : <Navigate to="login"/>);
}
export default RequiredAuth;