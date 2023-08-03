// import { UserAuth } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar.js/NavBar";
import apiProjectService from "../services/ApiProjectService";
import profilePicture from "../assets/img/profilePicture.jpg";
import DefaultLayout from "../../src/layouts/DefaultLayout";

const UserProfile = () => {
  const [profileUser, setProfileUser] = useState(null);
  const [isDisable, setIsDisable] = useState(true);

  const userRedux = useSelector((state) => state);
  const { allProjects } = useContext(AppContext);
  const [displayName, setDisplayName] = useState(profileUser?.displayName);
  const [email, setEmail] = useState(profileUser?.email);
  const [phone, setPhone] = useState(profileUser?.phone);
  const [address, setAddress] = useState(profileUser?.address);
  const [avt, setAvt] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, 0%)",
  };
  const disableStyle = {
    backgroundCcolor: "slate",
  };
  console.log(avt);
  return (
    <div className="flex flex-col h-screen">
      <Header title="Your Profile" />
      <div className="bg-slate-100  w-full h-full flex ">
        <NavBar />
        <div className=" w-full h-full animate-slideInToLeft md:animate-opacity">
          <div className="w-full h-full p-4 strongShadow flex">
            <div className="border-[1px] border-slate-300 overflow-hidden flex flex-col justify-between h-full w-1/4 bg-white ">
              <div className="w-full h-fit">
                <div className="p-2 flex items-center justify-center">
                  <h1 className="font-light text-lg">Your Profile</h1>
                </div>
                <div className=" w-full h-fit p-4 flex items-center justify-center">
                  <div className=" w-[100px] h-[100px] bg-white rounded-full truncate border-[3px] border-slate-300">
                    <img
                      className="w-full h-full"
                      src={userRedux.user?.photoURL}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center flex-col">
                  <h1 className="font-semibold texl-xl">
                    {userRedux.user?.displayName}
                  </h1>
                  <h2 className="font-light text-sm">
                    {userRedux.user?.email}
                  </h2>
                </div>
                <div className="w-full h-fit p-2 flex mt-6">
                  <div className="w-1/3 flex flex-col items-center justify-center">
                    <span className="font-bold text-xl">
                      {userRedux.user?.projectAmount}
                    </span>
                    <span className="text-slate-600 font-light text-sm">
                      Projects
                    </span>
                  </div>
                  <div className="w-1/3 flex flex-col items-center justify-center border-l-[1px] border-r-[1px] border-slate-300">
                    <span className="font-bold text-xl">
                      {userRedux.user?.espAmount}
                    </span>
                    <span className="text-slate-600 font-light text-sm">
                      Esps
                    </span>
                  </div>
                  <div className="w-1/3 flex flex-col items-center justify-center">
                    <span className="font-bold text-xl">
                      {userRedux.user?.pumpAmount}
                    </span>
                    <span className="text-slate-600 font-light text-sm">
                      Pumps
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 mt-6">
                  <div className="hover:translate-y-1 duration-300">
                    <input
                      // value={avt}
                      onChange={(e) => setAvt(e.target.files[0])}
                      type="file"
                      id="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      className="cursor-pointer px-4 p-2 color-Primary font-light text-sm text-white rounded-full "
                      htmlFor="file"
                    >
                      Upload New Avatar
                    </label>
                  </div>
                  <button
                    type="button"
                    className="px-4 p-2 c font-light text-sm text-white bg-red-600 rounded-full hover:translate-y-1 duration-300"
                  >
                    Delete your Account
                  </button>
                </div>
              </div>

              <div>
                <img src={profilePicture} alt="" />
              </div>
            </div>
            <div className="w-full h-full border-[1px] border-l-0 bg-white border-slate-300 flex">
              <div className="w-2/3 h-full">
                <div className="p-4 px-6 flex items-center justify-start border-b-[1px] border-slate-300">
                  <h1 className="font-light text-lg">Basic Information</h1>
                </div>
                <div>
                  <div className="h-full w-full flex flex-col border-b-[1px] border-slate-300">
                    <div className="flex ">
                      <div className="w-1/2 flex flex-col items-start gap-2 justify-center p-3 px-6">
                        <span className="font-bold">UserName</span>
                        <span className="font-light">
                          {userRedux.user?.displayName}
                        </span>
                      </div>
                      <div className="w-1/2 flex flex-col items-start gap-2 justify-center p-3 px-6">
                        <span className="font-bold">Email</span>
                        <span className="font-light">
                          {userRedux.user?.email || (
                            <span className="text-gray-400">None</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="w-1/2 flex flex-col items-start gap-2 justify-center p-3 px-6">
                        <span className="font-bold">Address</span>
                        <span className="font-light">
                          {userRedux.user?.address || (
                            <span className="text-gray-400">None</span>
                          )}
                        </span>
                      </div>
                      <div className="w-1/2 flex flex-col items-start gap-2 justify-center p-3 px-6">
                        <span className="font-bold">Phone</span>
                        <span className="font-light">
                          {userRedux.user?.phoneNumber || (
                            <span className="text-gray-400">None</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=" flex w-full  border-b-[1px] border-slate-300">
                    <div className="w-48 h-fit flex flex-col p-6 gap-10 justify-evenly items-start font-normal">
                      <span className="p-2">User Name</span>
                      <span className="p-2">Email</span>
                      <span className="p-2">Address</span>
                      <span className="p-2">Phone</span>
                    </div>
                    <div className="pl-0 w-full flex flex-col p-6 gap-10 justify-evenly items-start font-normal h-fit">
                      <input
                        value={displayName}
                        disabled={isDisable}
                        placeholder="Enter your User Name"
                        className={`w-2/3 outline-none p-2 px-4 border-[1px] border-slate-300 rounded-full ${
                          isDisable && "bg-slate-200"
                        }`}
                        alt=""
                      />
                      <input
                        value={email}
                        disabled={isDisable}
                        placeholder="Enter your Email"
                        className={`w-2/3 outline-none p-2 px-4 border-[1px] border-slate-300 rounded-full ${
                          isDisable && "bg-slate-200"
                        }`}
                        alt=""
                      />
                      <input
                        disabled={isDisable}
                        placeholder=" Enter your Address"
                        className={`w-2/3 outline-none p-2 px-4 border-[1px] border-slate-300 rounded-full ${
                          isDisable && "bg-slate-200"
                        }`}
                        alt=""
                      />
                      <input
                        disabled={isDisable}
                        placeholder="Enter your Phone"
                        className={`w-2/3 outline-none p-2 px-4 border-[1px] border-slate-300 rounded-full ${
                          isDisable && "bg-slate-200"
                        }`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex  flex-col w-full justify-center h-fit items-start">
                    <div className=" p-4 px-6 border-b-[1px] border-slate-300 w-full">
                      {!isDisable ? (
                        <div className="animate-opacity w-full items-center justify-end flex gap-2">
                          <button
                            onClick={() => setIsDisable(true)}
                            type="button"
                            className="px-4 p-2 c font-light text-sm text-slate-900 border-[1px] border-slate-400 rounded-full"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="px-4 p-2 color-Primary font-light text-sm text-white rounded-full"
                          >
                            Update
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsDisable(false)}
                          type="button"
                          className="animate-opacity px-4 p-2 w-fit color-Primary font-light text-sm text-white rounded-full"
                        >
                          Change Basic Information
                        </button>
                      )}
                    </div>

                    <div className=" p-4 px-6 w-full">
                      <button
                        type="button"
                        className="px-4 p-2 w-fit color-Primary font-light text-sm text-white rounded-full"
                      >
                        Change Your Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/3 h-full border-l-[1px] border-slate-300">
                <div className="p-4 px-6 flex items-center justify-start border-b-[1px] border-slate-300">
                  <h1 className="font-light text-lg">Last Update</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
