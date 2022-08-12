import Greeting from "../greeting"
import LogOut from "../../routes/logout"
export default function Header(){
    return(
        <div className="dashHeader">
            <Greeting className="greetings"/>
            <div className="logout"><LogOut /></div>
            
        </div>
    )
}