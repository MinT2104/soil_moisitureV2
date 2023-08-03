import Header from "../components/Header/Header";
import NavBar from "../components/NavBar.js/NavBar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ToastContainer } from "react-toast";

export const DefaultLayout = ({ children, title }) => {
  const { isOpenSideBar, setIsOpenSideBar } = useContext(AppContext);

  return (
    <div className="scrollbar flex flex-col h-screen relative">
      <ToastContainer delay={3000} />
      <Header
        isOpenSideBar={isOpenSideBar}
        setIsOpenSideBar={setIsOpenSideBar}
        title={title}
      />
      <div className="w-full flex dark:bg-[#2a213a] dark:text-white  h-[calc(100%-60px)]">
        <NavBar />
        {children}
      </div>
    </div>
  );
};
