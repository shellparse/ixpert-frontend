import { useEffect } from "react"
let inventoryList=[];
export default function InventoryNav () {
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URI}/inventory`).then((response)=>response.json())
        .then((data)=>{
            inventoryList=data.map((item)=><option key={item.sku}>{item.name}</option>)
        })
    },[])
    return (
        <div>
            <select>
                {inventoryList}
            </select>
        </div>
    )
}