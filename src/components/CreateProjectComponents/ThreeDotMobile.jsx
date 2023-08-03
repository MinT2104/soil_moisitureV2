import React from 'react'

export const ThreeDotMobile = ({
    handleCloseThreeDot,
    setThreeDot,
    isPump,
    isEsp,
    data,
    setPopupConfirm,
    setPopupDel
}) => {
  return (
    <div className="md:hidden shadow-xl fixed top-0 left-0 w-full h-screen z-50">
    <div
    onClick={handleCloseThreeDot}
    className="absolute top-0 left-0 animate-opacityV2 w-full bg-black opacity-80 h-screen z-[0] "></div>
    <div className="animate-slideUp  absolute  z-50 bottom-0 w-full bg-white rounded-xl rounded-br-none rounded-bl-none truncate flex flex-col justfy-between items-center h-fit">
    <ul className='w-full h-full dark:text-white dark:bg-[#2a213a] z-50 animate-slideUp'>
        <li 
        onClick={()=>{
            setPopupConfirm({isPopup: true, text:"Create new Esp?",data:data,setFor:"esp"})
            setThreeDot({
                isPopup: false,
                index: undefined
            })
        }}
        className='cursor-pointer border-b-[0.5px] border-slate-400'>
            <button 
            className={`hover:bg-slate-200 h-full w-full py-6 ${isEsp ? "bg-slate-200 dark:text-black":"bg-white"}`}
            disabled={isEsp? true:false }
            >Create Esp</button>
        </li>
        <li 
        onClick={()=>{
            setPopupConfirm({isPopup: true, text:"Create new Pumps?",data:data, setFor: "pump"})
            setThreeDot({
                isPopup: false,
                index: undefined
            })
        }}
        className='cursor-pointer border-b-[0.5px] border-slate-400'>
            <button 
            className={` h-full w-full py-6 ${isPump ? "bg-slate-200 dark:text-black":"bg-white dark:text-white dark:bg-[#2a213a] dark:hover:bg-slate-200"}`}
            disabled={isPump? true:false }
            >Create Pumps</button>
        </li>
        <li className='py-6 hover:bg-slate-200 dark:hover:text-black cursor-pointer border-b-[0.5px] border-slate-400'>Edit</li>
        <li 
        onClick={()=>{
            setPopupDel({isPopup: true, data: data})
            setThreeDot({
                        isPopup: false,
                        index: undefined
                    })
        }}
        className='py-6 hover:bg-slate-200 dark:hover:text-black cursor-pointer'>
            <button>Delete</button>
        </li>
    </ul>
</div>
</div>
  )
}
