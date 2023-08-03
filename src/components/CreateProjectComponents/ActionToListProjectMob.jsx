import React from 'react'
import AddIcon from '@mui/icons-material/Add';

    export const ActionToListProjectMob = ({
    handlePopupAddAvailable,
    handlePopupAddNew
    }) => {
    return (
        <div className=" items-center gap-2 flex mb-2 md:hidden">
        <button 
        onClick={handlePopupAddNew}
        className="py-1 color-Primary text-white font-light rounded px-4 flex items-center">
            <AddIcon/>
            New Project
        </button>
        <button 
        onClick={handlePopupAddAvailable}
        className="py-1 color-Primary text-white font-light rounded px-4 flex items-center">
            <AddIcon/>
            Available Project
        </button>
    </div>
    )
    }
