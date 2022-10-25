import { Drawer } from "@mui/material"
import { NavLink } from "react-router-dom"

export default function MainNav(){
    return(
        <div className={'dashMainNav'} >
            <Drawer sx={{width: "100%", [`& .MuiDrawer-paper`]: { width: "100%", boxSizing: 'border-box' }}} variant="permanent" elevation={7}  >
                <ul style={{listStyle:'none'}}>
                    <li><NavLink className={({isActive}) => isActive?"activeNav":""} to={"customers"}>customers</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive?"activeNav":""} to={"repairslip"}>repair slip</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive?"activeNav":""} to={"inventory"}>inventory</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive?"activeNav":""} to={"invoice"}>invoice</NavLink></li>
                </ul>
            </Drawer>
            </div>
    )
}