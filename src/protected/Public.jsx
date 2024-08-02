import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



export const Public = () =>{
    const { userName } = useSelector((state) => state.quiz);
    if(userName){
        return <Navigate to={"/questions"}/>
    }else{
        return <Outlet/>
       
    }
    }