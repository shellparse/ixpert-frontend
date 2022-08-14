import { Outlet } from "react-router-dom";

export default function Main(){
    return(
        <div className="dashMain">
            <Outlet />
        </div>
    )
}