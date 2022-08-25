import { useLocation } from "react-router-dom";
import InventoryNav from './InventoryNav'
export default function SecondaryNav({inventoryNav, setInventoryNav, activeItem, setActiveItem}){
    const location = useLocation()

    if (location.pathname==='/dashboard/inventory'){
    return(
        <div className="dashSecondaryNav">
            <InventoryNav inventoryNav={inventoryNav} setInventoryNav={setInventoryNav} activeItem={activeItem} setActiveItem={setActiveItem}  />
        </div>
    )
    } else {
        return (
        <div className="dashSecondaryNav">
            
        </div>
        )
    }

}