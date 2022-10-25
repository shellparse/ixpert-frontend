import Greeting from "../greeting"
import LogOut from "../../routes/logout"
import { AppBar, Toolbar } from "@mui/material"
export default function Header(){
    return(
        <div className="dashHeader">
            <AppBar sx={{ width: '100%', zIndex: (theme) => theme.zIndex.drawer +1 }} >
                <Toolbar>
                <Greeting className="greetings"/>
                <div className="logout"><LogOut /></div>
                </Toolbar>
            </AppBar>

        </div>
    )
}