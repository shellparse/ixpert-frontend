import { useState } from "react"
export default function Inventory () {
    const [inputs,setInputs] = useState({})
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
            if (data.acknowledged){
                console.log('inserted into database')
                
            }else if (data.code===11000) {
                console.log(`failed dup key:`)
            }
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
            <form onChange={handleChange} onSubmit={handleSubmit}>
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
                        <input type={"number"} name={"price"} id={"price"} required />
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
                    <input type={"submit"} name={"submit"} value={"save"} />
                </fieldset>
            </form>
        </div>
    )
}