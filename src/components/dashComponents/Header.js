import Greeting from "../greeting"
import LogOut from "../../routes/logout"
import { Box } from "@mui/material"
export default function Header(){
    return(
        // <div className="dashHeader">
            <Box className="dashHeader" sx={{padding:3, backgroundColor: 'primary.main'}}>
                <Greeting className="greetings"/>
                <div className="logout"><LogOut /></div>
                </Box>
        // </div>
    )
}