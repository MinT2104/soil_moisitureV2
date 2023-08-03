import React from 'react'

export const PopupDel = ({
    setPopupDel,
    handleDeleteProject,
    popupDel
}) => {
  return (
    <div className="dark:text-black shadow-xl animate-opacity absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center">
    <div className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-[0] "></div>
     <div className="z-50 w-[300px] bg-white h-[200px] rounded-xl truncate flex flex-col justfy-between items-center">
         <div className="flex items-center justify-center p-4 break-words h-full">
             <span className="text-black font-bold">Are you sure?</span>
         </div>
         <div className="flex flex-row gap-4 p-4 item-center justify-center">
             <div 
             onClick={()=>setPopupDel({isPopup: false,data:{}})}
             className="cursor-pointer hover:scale-105 duration-500 p-2 px-6 bg-gray-200 text-black rounded-xl">Cancel</div>
             <div 
             onClick={()=>handleDeleteProject(popupDel.data)}
             className="cursor-pointer hover:scale-105 duration-500 p-2 px-6 bg-red-600 text-white rounded-xl">Delete</div>
         </div>
     </div>
 </div>
  )
}
