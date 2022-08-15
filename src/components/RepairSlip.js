import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
export default function RepairSlip (props) {
    const [activeCustomer,setCustomer]=useOutletContext()
    const API = process.env.REACT_APP_API_URI
    let [inputs,setInputs] = useState({})
    function handleSubmit(e) {
        e.preventDefault()
        console.log(inputs)
        fetch(`${API}/slip`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        }).then((response)=>response.json())
        .then(data=>{
            const resDiv = document.getElementById('response')
            resDiv.style='visible'
            if(data.acknowledged){
            resDiv.innerHTML="customer created !!"
            resDiv.setAttribute('class','notify-success')
        } else {
            resDiv.innerHTML="Error: check entries"
            resDiv.setAttribute('class','notify-fail')
        }
        setTimeout(()=>{
            document.getElementById('response').style.visibility='hidden'
        },3000)
        e.target.reset()
        })
    }
    function handleChange(e) {
        let value = e.target.value
        let name = e.target.name
        setInputs((values) => ({...values,[name]:value}))
    }
    useEffect(()=>{
        if(activeCustomer._id){
        fetch(`${API}/customer/${activeCustomer._id}`)
        .then((res)=>res.json())
        .then((data)=>{
            document.getElementById('_id').setAttribute('value', data._id)
            document.getElementById('customerPhone').innerHTML=data.phoneNumber
            document.getElementById('customerName').innerHTML=data.name
            fetch(`${API}/slipnumber`,{
                method:'POST',
            }).then((res)=>res.json()).then((data)=>{
                document.getElementById('slipNumber').setAttribute('value',data.value.lastSlip)
            })
        })
    }
    },[API,activeCustomer])

    return (
        <div>
            create a repair slip: 
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label id='customerName'> </label>
                <label id='customerPhone'> </label>
                <label>
                    customer ID: {" "}
                    <input id={'_id'} required type={"text"} name="customerId" value={props.activeCustomer} disabled />
                </label>
                <label>
                    IMEI number: {" "}
                    <input required type={"text"} name="imei" />
                </label>
                <label>
                    slip number: {" "}
                    <input id={'slipNumber'} required type={'text'} name="slipNumber" disabled />
                </label>
                <label>
                    Brand:
                    <input type={"text"}  name={'brand'} required />
                </label>
                <label>
                    Model:
                    <input type={"text"} name={'model'} required />
                </label>
                <label>
                    Repairs Needed:
                    <input type={"text"} required />
                    <input type={"text"} />
                    <input type={"text"} />
                </label>
                <label>
                    Total:
                    <input type={'number'} name={'total'} required />
                </label>
                <fieldset>
                    <legend>Phone Status:</legend>
                    <label>
                        Front Camera:
                        <input type={"checkbox"} name={'frontCamera'} />
                    </label>
                    <label>
                        Back Camera:
                        <input type={"checkbox"} name={'backCamera'} />
                    </label>
                    <label>
                        Front Glass:
                        <input type={"checkbox"} name={'frontGlass'} />
                    </label>
                    <label>
                        LCD:
                        <input type={"checkbox"} name={'lcd'} />
                    </label>
                    <label>
                        Network:
                        <input type={"checkbox"} name={'network'} />
                    </label>
                    <label>
                        Charging Port:
                        <input type={"checkbox"} name={'chargingPort'} />
                    </label>
                    <label>
                        Battery:
                        <input type={"checkbox"} name={'battery'} />
                    </label>
                    <label>
                        Wireless Charging:
                        <input type={"checkbox"} name={'wirelessCharging'} />
                    </label>
                    <label>
                        Finger Print:
                        <input type={"checkbox"} name={'fingerPrint'} />
                    </label>
                    <label>
                        Face Id:
                        <input type={"checkbox"} name={'faceId'} />
                    </label>
                </fieldset>
                <input type={"submit"}/>
            </form>
            <div id="response"></div>
        </div>
    )
}