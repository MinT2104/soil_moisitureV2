
import moment from "moment";


const AddAvailable = ({redBorder, availableRef, foundProject, handleAddProject,handleFindProject,handleClosePopupAddAvailable}) => {
    return ( 
        <div className="dark:text-black shadow-xl animate-opacity absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center flex-col">
        <div 
        onClick={handleClosePopupAddAvailable}
        className="absolute top-0 left-0 w-full bg-black opacity-80 h-screen z-[0] "></div>
                    <div className="gap-4 mx-auto px-10 animate-opacity z-50 md:h-fit h-full w-full md:w-1/3 lg:w-1/3 bg-white flex flex-col justify-center items-center rounded  py-10">
                        <h1 className="font-bold text-xl">Add Available Project</h1>
                        <hr/>
                        <span className="text-center text-red-500 inline-block mt-5">{redBorder?.message}</span>

                       <div className="w-full flex justify-center rounded truncate">
                            <input
                            ref={availableRef}
                            className={`p-2 px-4 outline-none bg-gray-200  w-2/3 ${redBorder?.isRed && "border-red-500 border-[1px]"}`}
                            placeholder="Enter available project's ID" alt=""/>
                        </div> 
                        <div className="w-2/3">
                        { foundProject.length !==0 && 
                            <div
                            className="strongShadow animate-opacity w-full h-fit bg-white rounded p-2 flex items-center justify-between px-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-light text-lg">
                                        {foundProject[0]?.projectName}
                                    </span>
                                    <span className="font-light text-sm">
                                        {moment(foundProject[0]?.created_at).format("DD/MM/YYYY")}
                                    </span>
                                </div>
                                <button 
                                onClick={handleAddProject}
                                className="flex items-center font-light justify-center text-center color-Primary w-1/3 p-2 px-6 rounded text-white duration-300 ease-in cursor-pointer">Add</button>

                            </div>
                            }
                         </div>
                         <div className="w-full h-fit flex items-center justify-end gap-2">
                            <button 
                            onClick={handleClosePopupAddAvailable}
                            className='flex items-center font-light justify-center border-[1px] border-slate-400 text-center w-1/3 p-2 px-6 rounded text-black duration-300 ease-in cursor-pointer'>
                                <span>Cancel</span>
                            </button>
                            <button
                            onClick={handleFindProject}
                            className="flex items-center font-light justify-center text-center color-Primary w-1/3 p-2 px-6 rounded text-white duration-300 ease-in cursor-pointer">
                                Find
                            </button>
                         </div>
                    </div>
                    
        </div>
     );
}
 
export default AddAvailable;