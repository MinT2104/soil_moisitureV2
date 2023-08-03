import React, { useState } from 'react'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export const ProjectMangagementMob = ({
    currentProject,
    setIsPopupProjectManagementMob
}) => {
  const handlePopup = () => {
    setIsPopupProjectManagementMob(true)
  }  
  return (
    <div className='w-full h-16 bg-white rounded md:hidden flex color-Primary items-center justify-between'>
        <div className="p-2 px-4 flex justify-start gap-4 items-center  text-white">
            <span className=" dark:text-white font-bold text-[20px] flex items-center">
                {currentProject?.projectName  || <span className="text-sm font-bold">Please choose project</span>}
            </span>
        </div>
        <span className='text-white pr-4'>
        <MenuOpenIcon
        sx={{fontSize:30}}
        onClick={handlePopup}
            />
        </span>

    </div>
  )
}
