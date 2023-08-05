import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";
import apiProjectService from "../services/ApiProjectService";
import ErrorIcon from "@mui/icons-material/Error";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { ToastContainer, toast } from "react-toast";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../redux/reducer/userSlice";
import loginImg from "../assets/img/loginImg.jpg";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { loadCreation, setLoadCreation } = useContext(AppContext);
  const navigate = useNavigate();
  const userRedux = useSelector((state) => state);
  const [checked, setChecked] = useState({});
  const [alert, setAlert] = useState();
  const [borderRed, setBorderRed] = useState({
    nameBorder: false,
    passBorder: false,
  });
  const nameRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const handleGoogleSignIn = () => {
    try {
      dispatch(loginWithGoogle()).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const haddleAlert = (message) => {
    setAlert({ isAlert: true, message: message });
    setTimeout(() => {
      setAlert({ isAlert: false, message: message });
      setBorderRed({ nameBorder: false, passBorder: false });
    }, 4000);
  };
  const getLogin = (e) => {
    e.preventDefault();
    if (!nameRef.current?.value && !passRef.current?.value) {
      haddleAlert("UserName & Password must not be empty");
      setBorderRed({ nameBorder: true, passBorder: true });
    }
    if (nameRef.current?.value && !passRef.current?.value) {
      haddleAlert("Password must not be empty");
      setBorderRed({ passBorder: true, nameBorder: false });
    }
    if (!nameRef.current?.value && passRef.current?.value) {
      haddleAlert("UserName must not be empty");
      setBorderRed({ nameBorder: true, passBorder: false });
    }
    if (nameRef.current?.value && passRef.current?.value) {
      apiProjectService
        .post(`/user/login`, {
          username: nameRef.current?.value,
          password: passRef.current?.value,
        })
        .then((res) => {
          if (userRedux) {
            navigate("/");
            dispatch(login(res.data));
            setLoadCreation(!loadCreation);
          }
          setTimeout(() => {
            toast.success("Log in successfully!", {
              backgroundColor: "#8329C5",
              color: "#ffffff",
              position: "top-right",
              delay: 2000,
            });
          }, 1000);
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            haddleAlert(error.response?.data);
            setBorderRed({ nameBorder: true, passBorder: true });
            nameRef.current.value = "";
            passRef.current.value = "";
          }
          if (error.response?.status === 401) {
            haddleAlert(error.response?.data);
            setBorderRed({ nameBorder: false, passBorder: true });
            passRef.current.value = "";
          }
        });
    }
  };
  const throwErr = (error) => {
    passRef.current.value = "";
    nameRef.current.value = "";
    setChecked({
      isChecked: true,
      message: error.response?.data,
    });
    console.log(error);
    setTimeout(() => {
      setChecked({});
    }, 3000);
  };

  const LoginPageStyle = {
    divWrapper: "w-ful h-screen loginbg flex justify-center items-center",
    WrapperChild:
      "w-full md:w-4/5 h-full md:h-4/5 bg-white rounded-xl flex flex-row",
    divLeft:
      "w-1/2 md:flex hidden h-full p-2 border-r-[1px] border-gray-200 justify-center items-center",
    divRight:
      "md:w-1/2 w-full h-full p-2 flex flex-col justify-center items-center ",
    input:
      "w-full bg-none p-2 px-4 border-b-[1px] outline-none hover:border-blue-500 focus:border-blue-500",
    button:
      "w-1/2 p-2 color-Primary text-white rounded-full font-semibold hover:opacity-95 hover:translate-y-1 duration-500",
  };

  return (
    <div className=" z-20 w-full createBg h-screen flex items-center justify-center">
      <ToastContainer />
      {/* <form 
        className="md:h-fit h-full w-full md:w-2/3 lg:w-1/3 bg-white flex flex-col justify-center items-center md:rounded-2xl gap-4 py-10">

            <div className="font-bold text-xl text-black py-4">
                Sign In
            </div>
            <div className="flex flex-col items-center w-full">
            <div className="h-4">
                <span className={ `font-semibold text-red-600 ${checked.isChecked ? "block":"hidden"}`}>{checked?.message}</span>
            </div>
            </div>

            <div className="p-4 rounded-full w-2/3 mx-auto text-black  bg-gray-200">
                <input 
                ref={nameRef}
                className="w-full bg-transparent outline-none" placeholder="UserName..." alt=""/>
            </div>
            <div className="p-4 rounded-full w-2/3 mx-auto text-black bg-gray-200">
                <input
                ref={passRef}
                autoComplete="on"
                type="password"
                className="w-full bg-transparent outline-none" placeholder="Password..." alt=""/>
            </div>
            <button
            onClick={getLogin}
            className='flex items-center justify-center text-center bg-blue-600 w-1/3 p-2 px-6 rounded-full font-bold text-white hover:scale-110 duration-300 ease-in cursor-pointer'>
                <span>Sign in</span>
            </button>
            <div 
            className="rounded-xl shadow-sm truncate"
            onClick={handleGoogleSignIn}
            >
                <GoogleLoginButton/>
            </div>

            <Link className="text-blue-600 font-bold text-lg hover:scale-110 duration-300" to="/register">Sign Up</Link>
        </form> */}
      <form
        onSubmit={(e) => getLogin(e)}
        className={LoginPageStyle.WrapperChild}
      >
        <div className={LoginPageStyle.divLeft}>
          <img className="w-full h-auto" src={loginImg} alt="" />
        </div>
        <div className={LoginPageStyle.divRight}>
          <div className="w-full flex items-center flex-col gap-8 relative">
            <div className=" absolute -top-20 w-full">
              {alert?.isAlert === true && (
                <div className="flex items-center justify-center w-full flex-col gap-2 ">
                  <ErrorIcon sx={{ color: "red" }} />
                  <p className="text-red font-light text-red-500">
                    {alert?.message}
                  </p>
                </div>
              )}
            </div>
            {/* <div className="flex gap-2 flex-col">
                        <GoogleLoginButton onClick={handleGoogleSignIn}/>
                    </div> */}
            <span className="text-center font-bold text-2xl inline-block w-full font-serif">
              Sign In
            </span>
            <div className="w-full flex justify-center items-center flex-col gap-6">
              <div className="flex flex-col gap-2 w-3/4 md:w-2/3">
                <label className="font-bold">Name</label>
                <input
                  style={{ borderColor: borderRed.nameBorder ? `red` : `gray` }}
                  ref={nameRef}
                  className={LoginPageStyle.input}
                  type="text"
                  placeholder="ex: minChoco1234"
                />
              </div>
              <div className="flex flex-col gap-2 w-3/4 md:w-2/3">
                <label className="font-bold">Password</label>
                <input
                  style={{ borderColor: borderRed.passBorder ? `red` : `gray` }}
                  ref={passRef}
                  className={LoginPageStyle.input}
                  type="password"
                  placeholder="ex: 0123456789"
                />
              </div>
              <div className="w-2/3 flex justify-end">
                <span className="text-blue-600 cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 justify-end w-2/3">
              <button
                type="submit"
                className="flex items-center justify-center text-center bg-blue-600 w-full p-2 px-6 rounded-lg font-bold text-white cursor-pointer"
              >
                <span className="font-medium">Sign In</span>
              </button>
              <Link className="w-full" to="/register">
                <button
                  type="button"
                  className="flex items-center justify-center text-center text-white w-full p-2 px-6 rounded-lg font-bold bg-red-500 cursor-pointer"
                >
                  <span className="font-medium">Sign Up</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
