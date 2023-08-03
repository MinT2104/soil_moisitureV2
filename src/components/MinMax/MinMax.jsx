
const MinMax = (props) => {
    return ( 
        <div className="dark:bg-[#2a213a] w-1/4 justify-center md:justify-start bg-white rounded flex p-2">
          <div className="flex flex-row lg:ml-0 md:justify-center items-center w-full justify-center">
            <div className=" text-black  dark:text-white flex flex-col gap-2 items-center md:justify-center">
              <div className="text-black  dark:text-white font-bold text-[12px] md:text-[14px] h-1/2">{props.name}</div>
              <div className="text-black  dark:text-white font-light text-[10px] h-1/2">{props.value | "null"} </div>
            </div>
          </div>
    </div>
     );
}
 
export default MinMax;