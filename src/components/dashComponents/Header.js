import Greeting from "../greeting"
import LogOut from "../../routes/logout"
import { AppBar, Toolbar, Box } from "@mui/material"
export default function Header(){
    return(
        <AppBar position={'static'}>
            <Toolbar sx={{ justifyContent: 'space-between'}}>
            <Box sx={{width:100}}>
                <a href="/dashboard">
                <img src="/siteLogo.svg" alt="site logo"/>
            </a>
            </Box>
                <Greeting className="greetings"/>
                    <div className="logout"><LogOut /></div>
            </Toolbar>
        </AppBar>
    )
}