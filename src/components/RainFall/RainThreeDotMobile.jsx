import React from 'react'

export const RainThreeDotMobile = ({
    handleCloseThreeDot,
    handlePopupDelComfirm,
    data
}) => {
  return (
    <div className="md:hidden shadow-xl  fixed top-0 left-0 w-full h-screen z-50 ">
    <div
    onClick={handleCloseThreeDot}
    className="animate-opacityV2 absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-[0] "></div>
    <div className="animate-slideUp absolute bottom-0 z-50 w-full bg-white rounded-xl rounded-br-none rounded-bl-none truncate flex flex-col justfy-between items-center h-fit">
        <ul className='w-full h-full dark:text-white dark:bg-[#2a213a] z-50'>
            <li className='py-6 hover:bg-slate-200 dark:hover:text-black cursor-pointer border-b-[0.5px] border-slate-400'>Edit</li>
            <li 
            onClick={()=>handlePopupDelComfirm(data)}
            className='py-6 hover:bg-slate-200 dark:hover:text-black cursor-pointer'>
                <button 
                >Delete</button>
            </li>
        </ul>
</div>
</div>
  )
}
