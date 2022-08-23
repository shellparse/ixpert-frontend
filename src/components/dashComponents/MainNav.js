import { NavLink } from "react-router-dom"

export default function MainNav(){
    return(
        <div className="dashMainNav">
            <nav>
                <ul>
                    <li><NavLink className={({isActive}) => isActive?"activeNav":""} to={"customers"}>customers</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive?"activeNav":""} to={"repairslip"}>repair slip</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive?"activeNav":""} to={"inventory"}>inventory</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}