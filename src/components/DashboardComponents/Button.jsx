const Button = (props) => {
    return ( 
        <div className=" p-2 px-6 text-white  rounded-full bg-orange-600 w-32 flex justify-center items-center cursor-pointer">
            <span>{props.title}</span>
        </div>
     );
}
 
export default Button;