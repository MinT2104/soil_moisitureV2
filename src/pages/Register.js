
import {useState,useRef, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InfoIcon from '@mui/icons-material/Info';
import zxcvbn from "zxcvbn";
import apiProjectService from "../services/ApiProjectService";
import avatar from "../assets/img/avatar.png"
import {ToastContainer, toast } from 'react-toast'


const Login = () => {
    const nameRef = useRef()

    const navigate = useNavigate()
    const [checked, setChecked] = useState({})
    const [confirm, setConfirm] = useState("")
    const [inValidData, setInValidData] = useState(false)
    const [textMatched, setTextMatched] = useState("")
    const [password, setPassword] = useState("")

    const passchecked = zxcvbn(password)

    const handleSubmit =(e)=>{
        e.preventDefault()
    if(confirm && password && nameRef?.current?.value){
        if(confirm !== password){
            setChecked({
                isChecked: true,
                message: "Password is not matched",
            })
            setTimeout(()=>{
                setChecked({})
            },2000)
            setConfirm("")
            setPassword("")
            nameRef.current.value = ""
        }
        if(password.length < 6){
            setChecked({
                isChecked: true,
                message: "Password length must be 8-64 characters",
            })
            setTimeout(()=>{
                setChecked({})
            },2000)
            setConfirm("")
            setPassword("")
            nameRef.current.value = ""
        }else{
            apiProjectService.post("user/register",{
                username: nameRef?.current?.value,
                password: password,
                photoURL: avatar
            }).then((response)=>{
                setConfirm("")
                setPassword("")
                nameRef.current.value = ""
                toast('Create account successfully!', {
                    backgroundColor: '#8329C5',
                    color: '#ffffff',
                    position: "top-right",
                    delay: 2000
                  })
                
                setTimeout(()=>{
                navigate("/login")
                },3000)
            }).catch((error) => {
                if(error.response?.status === 409){
                    setConfirm("")
                    setPassword("")
                    nameRef.current.value = ""
                    setChecked({
                        isChecked: true,
                        message: error.response?.data,
                    })
                    setTimeout(()=>{
                        setChecked({})
                    },3000)
                }
              });
        }
    }else{
        setChecked({
            isChecked: true,
            message: "All fields are required",
        })
        setTimeout(()=>{
            setChecked({})
        },2000)
        setConfirm("")
        setPassword("")
        nameRef.current.value = ""
    }
        
        
    }
    const handleConfirm = (e) => {
        setConfirm(e.target?.value)
    }
    const colorBar = ()=>{
        switch(passchecked.score){
            case 0: return "bg-red-500"
            case 1: return "bg-red-500"
            case 2: return "bg-orange-500"
            case 3: return "bg-green-500"
            case 4: return "bg-green-500"
            default: return "bg-none"
        }
    }
    const widthBar = ()=>{
        switch(passchecked.score){
            case 0: return "w-0"
            case 1: return "w-1/4"
            case 2: return "w-1/2"
            case 3: return "w-3/4"
            case 4: return "w-full"
            default: return "bg-none"
        }
    }
    const changePWBar = ()=>({
        width: `${widthBar()}`,
        color: `${colorBar()}`,
    })
    useEffect(()=>{
        if(password?.length !== 0   ){
            if(confirm && confirm === password){
                setTextMatched({
                    message: "password is matched",
                    color: "text-green-500"
                })
            }
            if(confirm && confirm !== password)
            {
                setTextMatched({
                    message: "password is not matched",
                    color: "text-red-500"
                })
            }
        }else{
            setTextMatched({})
        }
        if(confirm?.length === 0  ) setTextMatched({})

    },[confirm])
 
    return ( 
        <div className=' z-20 w-full createBg h-screen flex items-center justify-center'>
            <ToastContainer/>
        <form 
        onSubmit={handleSubmit}
        className="md:h-fit h-full w-full md:w-2/3 lg:w-1/3 bg-white flex flex-col justify-center items-center md:rounded-2xl gap-4 py-10">
            <div className="font-bold text-xl text-black py-4">
                Sign Up
            </div>
            <div className="flex flex-col items-center w-full">
            {inValidData && <span className="text-red-600">InValid</span>}
            <div className="h-4">
                <span className={ `font-semibold text-red-600 ${checked.isChecked ? "block":"hidden"}`}>{checked?.message}</span>
            </div>
          
            </div>
           
                <input 
                ref={nameRef}
                className="w-2/3 p-4 rounded-sm bg-gray-200 mx-auto outline-none" placeholder="UserName..." alt=""/>
               <div className="w-2/3 mx-auto">
                <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    className={`w-full p-4 rounded-sm bg-gray-200 mx-auto outline-none border-b-[2px]`} 
                    placeholder="Password..." alt=""/>
                    <div className="w-full mx-auto h-[2px]">
                        <div className={`${changePWBar().width} ${changePWBar().color} h-full`}></div>
                    </div>
               </div>
               
            <div className="w-full flex flex-col gap-2">
                <div className="mx-auto w-2/3 flex items-center relative">
                    <input
                    type="password"
                    value={confirm}
                    onChange={handleConfirm}
                    autoComplete="on"
                    className={`w-full ${password && confirm ? 'pr-10':'pr-4'} outline-b-none p-4 rounded-sm bg-gray-200 mx-auto outline-none `} placeholder="Confirm..." alt=""/>
                   <span className={`absolute right-3 ${textMatched?.color} ${ confirm && password ? 'block':'invisible'}`}>
                    <InfoIcon />
                    </span>
    
                </div>
               
                <div className={`w-2/3 mx-auto flex items-center gap-2 `}>
                    <span className={`${textMatched?.color} ${ confirm && password ? 'block':'invisible'}`}><FiberManualRecordIcon sx={{fontSize: 10}}/></span>
                    <p className={`${textMatched?.color} font-semibold text-[14px]`}>
                            {textMatched?.message}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2 justify-end w-2/3">
                <Link className="w-1/3" to="/login">
                    <button className='flex items-center justify-center text-center text-slate-500 w-full p-2 px-6 rounded-lg font-bold border-[1px] border-slate-400 cursor-pointer'>
                        <span className="font-light">Back</span>
                    </button>
                </Link>
                
                <button className='flex items-center justify-center text-center bg-blue-600 w-1/3 p-2 px-6 rounded-lg font-bold text-white cursor-pointer'>
                    <span className="font-light">Sign Up</span>
                </button>
            </div>
        </form>
        
</div>
     );
}
 
export default Login;