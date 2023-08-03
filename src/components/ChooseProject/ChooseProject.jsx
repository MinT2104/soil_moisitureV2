const ChooseProject = (props) => {
    return ( 
        <div 
           onClick={props.onClick}
           className="md:w-fit w-full justify-center items-center cursor-pointer animate-opacity p-2 px-4 rounded text-lg font-black text-white bg-green-600 hover:scale-95 duration-300 hover:bg-gray-400">
            <span>Search Project</span>
        </div>
     );
}
 
export default ChooseProject;