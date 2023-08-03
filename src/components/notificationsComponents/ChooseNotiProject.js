import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext";

const ChooseNotiProject = ({
    userData,
    isOpenChooseProject,
    setIsOpenChooseProject,
    setIsOpenChooseDay,
    setProjectChose,
    projectchose,
    errObj
}) => {

    const {allProjects} = useContext(AppContext)

    return ( 
        <div 
        className='relative '>
        <div 
        id='choose_project'
        onClick={()=>{
            setIsOpenChooseProject(!isOpenChooseProject)
            setIsOpenChooseDay(false)
        }}
        className={`dark:border-white dark:text-white w-full h-[56px] rounded border-[0.5px] cursor-pointer hover:border-black flex justify-between items-center py-[16.5px] pl-[14px] pr-2 text-gray-500
        ${errObj?.isOpen ? "border-red-500": "border-gray-400"}
        `}> 
            <span
            id='choose_project' 
            className="font-normal ">{projectchose?.projectName || "All"}</span >
            {isOpenChooseProject ? 
            <span><ArrowDropUpIcon sx={{fontSize:20}}/></span>
                :
            <span><ArrowDropDownIcon sx={{fontSize:20}}/></span>
             }
            
        </div>
        {isOpenChooseProject && 
            <div  className='dark:text-black absolute top-16 left-0 w-full h-fit bg-white rounded p-2 text-black shadow-main animate-opacity z-50'>
                <div
                onClick={()=>{
                    setProjectChose("All")
                    setIsOpenChooseProject(false)
                }}
                className='cursor-pointer hover:bg-gray-200 rounded duration-300 p-1 px-2 font-normal'>
                    All
                </div>
                {allProjects?.map((data,index)=>(              
                                <div
                                key={index}
                                onClick={()=>{
                                    setProjectChose(data)
                                    setIsOpenChooseProject(false)
                                }}
                                className='cursor-pointer hover:bg-gray-200 rounded duration-300 p-1 px-2 font-normal'>
                                   {data?.projectName}
                                </div>
                ))}

            </div>
            }
        </div>
       
     );
}
 
export default ChooseNotiProject;