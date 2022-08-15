import { Outlet } from "react-router-dom";

export default function Main(props){
    return(
        <div className="dashMain">
            <Outlet context={[props.activeCustomer, props.setCustomer]} />
        </div>
    )
}