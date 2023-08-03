import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { UserAuth } from "../../context/AuthContext";





const ChoosePopup = () => {
    const {user} = UserAuth()
    const [inputValue, setInputValue] = useState("")
    const {setIsChoosePopup, allProjects,setCurrentProject,loading, setLoading,allUserProject} = useContext(AppContext)
    const handleCreatePopUp =()=>{
        setIsChoosePopup(false)
    }
    
    const handleFilterSearch = (e)=>{
        setInputValue(e.target.value) 
  
    }
        const allProjectFilter = allProjects.filter((item)=>
        item.projectID
    )
        const projectAll = allProjectFilter.filter((item)=>item.uid === user?.uid)

        const filteredProject = projectAll.filter((data)=>{
            return data.projectName.toLowerCase().includes(inputValue.toLowerCase())
        })
   
    // console.log(filteredProject)
    return ( 
        <div className="animate-opacity md:hidden block w-full h-screen bg-transparent z-50 fixed">
        <div className="z-50 absolute w-full h-full top-0 left-0 opacity-80 bg-black"></div>
        <div className='w-full h-full flex justify-center items-center'>
            <div className={`w-full md:w-1/3 h-full bg-[#202836] z-50 absolute top-50 pt-16`}>
                <div className='flex flex-row items-center bg-[#202836] justify-center bg-transparent'>
                    <div className='p-2 bg-[#202836] w-4/5'>
                        <input 
                        onChange={handleFilterSearch}
                        value={inputValue}
                        placeholder="Search..."
                        className="p-2 w-full bg-transparent outline-none text-white border-b-[1px] border-white" alt=""/>
                    </div>
                </div>
                <div className="overflow-y-scroll scrollbar w-full bg-[#202836] gap-2 h-72 pt-5 flex flex-col items-center">
                   
                    {filteredProject?.map((data,index)=>(
                        <div 
                        onClick={()=>{
                            setIsChoosePopup(false)
                            setCurrentProject(data)
                            setLoading(loading)
                        }}
                        key={index}
                        className="flex animate-opacity justify-start bg-[#2f3b50] items-center w-4/5 mx-auto cursor-pointer hover p-2 px-4 rounded text-md font-light text-white hover:scale-95 duration-300 hover:bg-gray-400">
                            <span className="truncate">{data.projectName}</span>
                        </div>
                    ))}
                </div>
                <div className='absolute top-2 right-2 flex flex-row items-center justify-center bg-transparent'>
                    <div
                    onClick={handleCreatePopUp}
                    className='p-2 rounded rounded-tr-none rounded-tl-none '>
                        <div className='cursor-pointer hover:rotate-45 duration-500 hover:scale-90 flex flex-row items-center justify-center gap-2 rounded-full bg-red-600 p-2 shadow-xl'>
                            <CancelIcon sx={{fontSize: 15}}/>
                        </div>
                    </div>
            
                </div>
        </div>
        </div>
       
    </div>
     );
}
 
export default ChoosePopup;