import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const IsRead = ({
    setIsOpenChooseDay,
    setIsOpenChooseProject,
    isOpenChooseDay,
    setReadChoose,
    readChoose,
    errObj
}) => {

    const readObject = [{name: "All"},{name:"Yes"},{name:"No"}]

    return ( 
        <div 
        className='relative'>
        <div 
        id='choose_read'
        onClick={()=>{
            setIsOpenChooseDay(!isOpenChooseDay)
            setIsOpenChooseProject(false)
        }}
        className={`dark:border-white dark:text-white w-full h-[56px] rounded border-[0.5px] cursor-pointer hover:border-black flex justify-between items-center py-[16.5px] pl-[14px] pr-2 text-gray-500
        ${errObj?.isOpen ? "border-red-500": "border-gray-400"}
        `}>  
            <span
            id='choose_read' 
            className="font-normal ">{readChoose}</span >
            {isOpenChooseDay ? 
            <span><ArrowDropUpIcon sx={{fontSize:20}}/></span>
                :
            <span><ArrowDropDownIcon sx={{fontSize:20}}/></span>
             }
        </div>
        {isOpenChooseDay && 
            <div  className='absolute top-16 left-0 w-full h-fit bg-white rounded p-2 text-black shadow-main animate-opacity z-50'>
                {readObject?.map((data,index)=>(              
                                <div
                                key={index}
                                onClick={()=>{
                                    setReadChoose(data.name)
                                    setIsOpenChooseDay(false)
                                }}
                                className='cursor-pointer hover:bg-gray-200 rounded duration-300 p-1 px-2 font-normal'>
                                   {data?.name}
                                </div>
                ))}

            </div>
            }

        </div>
     );
}
 
export default IsRead;