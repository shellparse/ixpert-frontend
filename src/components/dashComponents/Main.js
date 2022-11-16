import { Outlet } from "react-router-dom";

export default function Main(props){
    return(
        <div className="dashMain">
            <Outlet context={{snackBarMsg: props.snackBarMsg, setSnackBarMsg: props.setSnackBarMsg}} />
        </div>
    )
}