import { Drawer } from "@mui/material"
import { NavLink } from "react-router-dom"

export default function MainNav(){
    return(
        <div className={'dashMainNav'} >
            <Drawer variant="permanent" >
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