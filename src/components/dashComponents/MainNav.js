import { NavLink } from "react-router-dom"

export default function MainNav(){
    return(
        <div className="dashMainNav">
            <nav>
                <NavLink className={style} to={"/dashboard/customers"}>customers</NavLink>
            </nav>
        </div>
    )
}