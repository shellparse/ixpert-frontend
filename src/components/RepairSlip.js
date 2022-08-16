import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import Userfront from "@userfront/react"
export default function RepairSlip (props) {
    const [activeCustomer,setCustomer]=useOutletContext()
    const API = process.env.REACT_APP_API_URI
    let [inputs,setInputs] = useState({})

    function handleSubmit(e) {
        e.preventDefault()
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
        let target = e.target
        let value = target.value
        let name = target.name
        if (name==="repairItem") {
            return
        }else if (target.type==="checkbox"){
            setInputs((values)=>({...values,checkInStat:{...values.checkInStat,[name]:value==="on"?true:false}}))
        }else{
        if (name==="total")value=parseFloat(value)
        setInputs((values) => ({...values,[name]:value}))
    }
    }
    useEffect(()=>{
        setInputs({
            checkInStat:{
                "frontCamera": false,
                "backCamera": false,
                "backGlass": false,
                "frontGlass": false,
                "lcd": false,
                "network": false,
                "chargingPort": false,
                "battery": false,
                "wirelessCharging": false,
                "fingerPrint": false,
                "faceId": false
            },
            neededRepairs: [],
            cashier: Userfront.user.name
        })
        if(activeCustomer._id){
        fetch(`${API}/customer/${activeCustomer._id}`)
        .then((res)=>res.json())
        .then((data)=>{
            document.getElementById('_id').setAttribute('value', data._id)
            document.getElementById('customerPhone').innerHTML='Phone number: '+data.phoneNumber
            document.getElementById('customerName').innerHTML='Customer name: '+data.name
            document.getElementById('customerName').removeAttribute('class')
            fetch(`${API}/slipnumber`,{
                method:'POST',
            }).then((res)=>res.json()).then((data)=>{
                document.getElementById('slipNumber').setAttribute('value',data.value.lastSlip)
                setInputs((current)=>({...current,slipNumber: data.value.lastSlip.toString()}))
            })
        })
    }
    },[API,activeCustomer])
    function liFromRepairs(arr){
        if(arr){
            return arr.map((item,index)=><li key={index}><input type={"button"} value={"X"} onClick={remFromList} className="close" />{item}</li>)
        }
    }
    
    function remFromList(e){
        let li = e.target.parentNode
        console.log(li.textContent)
        setInputs((values)=>({...values,neededRepairs:values.neededRepairs.filter((elm)=>elm!==li.textContent)}))
    }
    function addToList(e){
        let field = document.getElementById('repairItem')
        let value = field.value
        if(value==="")return
        setInputs((values)=>({...values,neededRepairs:[...values.neededRepairs,value]}))
        field.value=""
    }
    return (
        <div>
            create a repair slip: 
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label className="notify-fail" id='customerName'>please select a customer first</label>
                <label id='customerPhone'></label>
                    <input hidden id={'_id'} required type={"text"} name="customerId" value={props.activeCustomer} disabled />
                <label>
                    IMEI number: {" "}
                    <input required type={"text"} name="imei" />
                </label>
                <label>
                    slip number: {" "}
                    <input id={'slipNumber'}  type={'number'} name="slipNumber" disabled required />
                </label>
                <label>
                    Brand:
                    <input type={"text"}  name={'brand'} required />
                </label>
                <label>
                    Model:
                    <input type={"text"} name={'model'} required />
                </label>
                <fieldset>
                    <legend>Repairs Needed:</legend>
                <label>
                    <input id={"repairItem"} name={"repairItem"} type={"text"} />
                    <input name={"repairInput"} type={'button'} id='addRepairItem' value={'Add'} onClick={addToList} />
                </label>
                <div id={'repairsList'}>
                    <ul>
                    {liFromRepairs(inputs.neededRepairs)}
                    </ul>
                </div>
                </fieldset>
                <label>
                    Total:
                    <input id={"total"} type={'number'} name={'total'} required />
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