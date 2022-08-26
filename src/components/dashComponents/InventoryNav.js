import { useEffect } from "react"
import React from "react"
export default function InventoryNav ({inventoryNav, setInventoryNav, activeItem, setActiveItem}) {
     useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URI}/inventory`).then((response)=>response.json())
        .then((data)=>{
            if(data){
                setInventoryNav(()=>([...data]))
            }
        })
     
    },[setInventoryNav])

    function handleNavSelection (e){
        let target=e.target
        let value = target.value
        setActiveItem(inventoryNav.filter((item)=>item.sku===value)[0])
    }
    return (
        <div>
            <select size={inventoryNav.length} id={"inventoryNav"} onChange={handleNavSelection}>
                <option hidden></option>
                {inventoryNav.map((item)=><option key={item.sku} value={item.sku}>{item.name}</option>)}
            </select>
        </div>
    )
}