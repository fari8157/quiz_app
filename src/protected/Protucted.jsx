import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



export const Protected = () =>{
    const { userName } = useSelector((state) => state.quiz);
    if(userName){
        return <Outlet/>
    }else{
        return <Navigate to={"/"}/>
    }
}