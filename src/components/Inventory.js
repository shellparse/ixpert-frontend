import { useState } from "react"
import { useOutletContext } from "react-router-dom"

export default function Inventory () {
    const [inputs,setInputs] = useState({})
    const setInventoryNav = useOutletContext()[3]
    const activeItem = useOutletContext()[4]
    console.log(useOutletContext())
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API_URI}/inventory`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        }).then((response)=>response.json())
        .then((data)=>{
            const resDiv = document.getElementById('response')
            if (data.acknowledged){
                setInventoryNav((values)=>([...values,inputs]))
                resDiv.style='visible'
                resDiv.innerHTML="item created !!"
                resDiv.setAttribute('class','notify-success')
                document.getElementById('createItem').reset()
            }else if (data.code===11000) {
                resDiv.style='visible'
                resDiv.innerHTML="error: duplicate item"
                resDiv.setAttribute('class','notify-fail')
            }else {
                resDiv.style='visible'
                resDiv.innerHTML="error: something went wrong"
                resDiv.setAttribute('class','notify-fail')
            }
            setTimeout(()=>{
                resDiv.style.visibility='hidden'
            },3000)
        })
    }
    function handleChange(e) {
        let target = e.target
        let name = target.name
        let value = target.value
        if(e.target.type==="number")value=parseFloat(value)
        setInputs((values)=>({...values,[name]:value}))
    }
    return (
        <div>
            <form onChange={handleChange} onSubmit={handleSubmit} id="createItem">
                <fieldset>
                    <legend>Create stock item</legend>
                    <label>
                        SKU:
                        <input type={"text"} name={"sku"} id={"sku"} required />
                    </label>
                    <label>
                        Name:
                        <input type={"text"} name={"name"} id={"name"} required />
                    </label>
                    <label>
                        Category:
                        <input type={"text"} name={"category"} id={"category"} />
                    </label>
                    <label>
                        Description:
                        <input type={"text"} name={"description"} id={"description"} />
                    </label>
                    <label>
                        Price:
                        <input type={"number"} name={"price"} step="0.01" id={"price"} required />
                    </label>
                    <label>
                        Quantity:
                        <input type={"number"} name={"quantity"} id={"quantity"} required />
                    </label>
                    <label>
                        Brand:
                        <input type={"text"} name={"brand"} id={"brand"} />
                    </label>
                    <label>
                        Model:
                        <input type={"text"} name={"model"} id={"model"} />
                    </label>
                    <label>
                        IMEI:
                        <input type={"text"} name={"imei"} id={"imei"} />
                    </label>
                    <label>
                        Ram:
                        <input type={"text"} name={"ram"} id={"ram"} />
                    </label>
                    <label>
                        Storage:
                        <input type={"text"} name={"storage"} id={"storage"} />
                    </label>
                    <label>
                        Color:
                        <input type={"text"} name={"color"} id={"color"} />
                    </label>
                    <input type={"submit"} name={"submit"} value={"create"} />
                </fieldset>
            </form>
            <form id={'editItem'}>
                <fieldset>
                    <legend>Edit stock item:</legend>
                    <label>
                        SKU:
                        <input type={"text"} name={"sku"} disabled value={activeItem.sku} />
                    </label>
                    <label>
                        Name:
                        <input type={"text"} name={"name"} value={activeItem.name} />
                    </label>
                    <label>
                        Category:
                        <input type={"text"} name={"category"}  value={activeItem.category} />
                    </label>
                    <label>
                        Description:
                        <input type={"text"} name={"description"} value={activeItem.description}/>
                    </label>
                    <label>
                        Price:
                        <input type={"number"} name={"price"} step="0.01" value={activeItem.price} />
                    </label>
                    <label>
                        Quantity:
                        <input type={"number"} name={"quantity"} value={activeItem.quantity}/>
                    </label>
                    <label>
                        Brand:
                        <input type={"text"} name={"brand"} value={activeItem.brand} />
                    </label>
                    <label>
                        Model:
                        <input type={"text"} name={"model"} value={activeItem.model}  />
                    </label>
                    <label>
                        IMEI:
                        <input type={"text"} name={"imei"} value={activeItem.imei}  />
                    </label>
                    <label>
                        Ram:
                        <input type={"text"} name={"ram"} value={activeItem.ram} />
                    </label>
                    <label>
                        Storage:
                        <input type={"text"} name={"storage"} value={activeItem.storage} />
                    </label>
                    <label>
                        Color:
                        <input type={"text"} name={"color"} value={activeItem.color} />
                    </label>
                    <input type={"submit"} name={"submit"} value={"save"} />
                </fieldset>
            </form>
            <div id="response"></div>
        </div>
    )
}