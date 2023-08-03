import moment from "moment";
import { useEffect, useState } from "react";
import apiProjectService from "../../services/ApiProjectService";


const ListNoti = ({
    userData,
    setCheckList,
    checkList,
    filterObject,
    load,
    setLoad,
    setModalMessage,
    setFilterItems, 
    filterItems,
    setErrObj
}) => {
    // const [loadNoti, setLoadnoti] = useState(false)
    const handleAddCheckbox = (e,data)=>{
        if(e.target.checked){
            setCheckList(prev=>[...prev,data ])
        }else{
           const filterData = checkList.filter(dt=> dt !== data)
            setCheckList(filterData)
        }

    }
    useEffect(()=>{
        setFilterItems([])
    },[load])
    useEffect(()=>{
        if(filterObject?.pid === "All"){
            if(filterObject?.isRead === "All"){
                const dayfilter = userData?.filter((data)=>
                moment(data?.created_at).format("DD/MM/YYYY") === filterObject?.day
                )
                setFilterItems(dayfilter)

            }else{
                const isReadFilter = userData?.filter((data)=> data.isRead === filterObject?.isRead)
                const dayfilter = isReadFilter?.filter((data)=>
                moment(data?.created_at).format("DD/MM/YYYY") === filterObject?.day
                 )
                 setFilterItems(dayfilter)
            }
        }else{
            const projectFilter = userData?.filter((data)=>data.pid === filterObject?.pid)
            if(filterObject?.isRead === "All"){
                const dayfilter = projectFilter?.filter((data)=>
                moment(data?.created_at).format("DD/MM/YYYY") === filterObject?.day
                )
                setFilterItems(dayfilter)

            }
            else{
                const isReadFilter = projectFilter?.filter((data)=> data.isRead == filterObject?.isRead)
                const dayfilter = isReadFilter?.filter((data)=>
                moment(data?.created_at).format("DD/MM/YYYY") === filterObject?.day
                 )
                 setFilterItems(dayfilter)
            }
        }
    },[filterObject])
    // useEffect(()=>{
    //     document.getElementById("applyBtn").addEventListener("click",()=>{
    //         setTimeout(()=>{
    //             if(filterItems.length === 0){
    //                 setErrObj({isOpen: true, message: "Empty notifications box"})
    //             setTimeout(()=>{
    //                 setErrObj({isOpen: false, message: ""})
    //             },3000)
    //     }
    //         },500)
    //     })
    // },[])
    const handleOpenMessage = (data)=>{
        if(!data?.isRead){
            apiProjectService.put(`/noti/update`,{
                created_at: data.created_at,
                pid: data.pid,
                isRead: true
            }).then(res=> setLoad(!load) )
        }
        setModalMessage({
            isOpen: true,
            projectName: data?.projectName,
            message: data?.message,
            created_at: data?.created_at
        })
    }
    return (  

        <div className=" animate-opacity w-full rounded h-[calc(100%-56px)] bg-slate-300 flex flex-col gap-1 p-1 overflow-auto">
            {filterItems.length === 0 ? userData?.map((data,index)=>(
            <div 
            key={index}
            className={` animate-opacity  w-full ${!data.isRead ? " color-Primary text-white": "bg-white text-black"}  rounded flex items-center justify-between px-4 cursor-pointer hover:bg-gray-300 duration-500`} >
                <div className="flex gap-2 py-4 w-2/3">
                    <input 
                    id={data.created_at} 
                    onClick={(e)=>handleAddCheckbox(e,data.created_at)}
                    type="checkbox" alt=""/>
                    <span
                    onClick={()=>handleOpenMessage(data)}
                    className="font-bold  inline-block w-20 truncate">{data.projectName}</span>
                    <span 
                    onClick={()=>handleOpenMessage(data)}
                    className="font-light  truncate">{data.message}</span>
                </div>
                <div
                className="w-full py-4 text-right"
                onClick={()=>handleOpenMessage(data)}
                >
                    {moment(data.created_at).format("DD/MM/YY hh:mm")}
                </div>
            </div>
            ))
               : 
               filterItems?.map((data,index)=>(
                <div 
                key={index}
                onClick={()=>handleOpenMessage(data)}
                className={`animate-opacity py-4 w-full ${!data.isRead ? " color-Primary text-white": "bg-white text-black"}  rounded flex items-center justify-between px-4 cursor-pointer hover:bg-gray-300 duration-500`} >
                    <div className="flex gap-2 w-2/3">
                        <input 
                        id={data.created_at} 
                        onClick={(e)=>handleAddCheckbox(e,data.created_at)}
                        type="checkbox" alt=""/>
                        <span className="font-bold inline-block w-20 truncate">{data.projectName}</span>
                        <span className="font-light truncate">{data.message}</span>
                    </div>
                    <div>
                        {moment(data.created_at).format("DD/MM/YY hh:mm")}
                    </div>
                </div>
                ))
        }
                           

    </div> 
    );
}
 
export default ListNoti;

