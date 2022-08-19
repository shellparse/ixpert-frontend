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
        }).then((response)=>{
            if(response.headers.has('Content-Type')){
                return null
            }else{
                return response.blob()
            }
        })
        .then(blob=>{
            const resDiv = document.getElementById('response')
            if(blob){
            blob = blob.slice(0, blob.size, "application/pdf")
            let blobURL = URL.createObjectURL(blob);
            setTimeout(()=>{
                window.open(blobURL);
            },1500)
            resDiv.style='visible'
            resDiv.innerHTML="repair slip created !!"
            resDiv.setAttribute('class','notify-success')
            fetch(`${API}/slipnumber`,{method:'POST'})
            } else {
                resDiv.innerHTML="Error: check entries"
                resDiv.setAttribute('class','notify-fail')
            }
            setTimeout(()=>{
                document.getElementById('response').style.visibility='hidden'
            },3000)
            e.target.reset()
            while (document.getElementById("repairListul").firstChild){
                document.getElementById("repairListul").removeChild(document.getElementById("repairListul").firstChild)
            }
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
                "faceId": false,
                "speaker": false,
                "microphone": false,
                "screws": false
            },
            neededRepairs: [],
            cashier: Userfront.user.name,
            returned: false,
        })
        if(activeCustomer._id){
        fetch(`${API}/customer/${activeCustomer._id}`)
        .then((res)=>res.json())
        .then((data)=>{
            document.getElementById('_id').setAttribute('value', data._id)
            document.getElementById('customerPhone').setAttribute('value', data.phoneNumber)
            document.getElementById('customerName').setAttribute('value', data.name)
            document.getElementById('customerEmail').setAttribute('value', data.email)
            setInputs((values)=>({...values,customerName:data.name,customerPhone:data.phoneNumber,customerEmail:data.email}))
            fetch(`${API}/slipnumber`).then((res)=>res.json()).then((data)=>{
                if(data){
                document.getElementById('slipNumber').setAttribute('value',data.lastSlip+1)
                setInputs((current)=>({...current,slipNumber: (data.lastSlip+1).toString()}))
                } else {
                    document.getElementById('slipNumber').setAttribute('value',1)
                    setInputs((current)=>({...current,slipNumber: "1"}))
                }
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
            {!activeCustomer._id?<div className="notify-fail">please select a customer first</div>:""}   
            <form id={"repairSlip"} onChange={handleChange} onSubmit={handleSubmit}>
                <label>create slip:</label>
                <fieldset>
                    <legend>client details:</legend>
            <label>
                slip number: {" "}
                <input id={'slipNumber'}  type={'number'} name="slipNumber" disabled required />
            </label>
                <label>
                    Name: 
                    <input type={"text"} name="customerName" id="customerName" disabled required />
                </label>
                <label >
                    Phone number:
                    <input type={'text'} name="customerPhone" id="customerPhone" disabled required />
                </label>
                <label >
                    E-mail:
                    <input type={'text'} name="customerEmail" id="customerEmail" disabled required />
                </label>
                <input hidden id={'_id'} required type={"text"} name="customerId" value={props.activeCustomer} disabled />
                </fieldset>
                <fieldset>
                    <legend>Phone details:</legend>
                <label>
                    IMEI number: {" "}
                    <input required type={"text"} name="imei" />
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
                    Pass code:
                    <input type={"text"} name={'passCode'} />
                </label>
                </fieldset>
                <fieldset>
                    <legend>Repairs Needed:</legend>
                <label>
                    <input id={"repairItem"} name={"repairItem"} type={"text"} />
                    <input name={"repairInput"} type={'button'} id='addRepairItem' value={'Add'} onClick={addToList} />
                </label>
                <div id={'repairsList'}>
                    <ul id={"repairListul"}>
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
                    <label className="checkboxLabel">
                        Front Camera:
                        <input type={"checkbox"} name={'frontCamera'} />
                    </label>
                    <label className="checkboxLabel">
                        Back Camera:
                        <input type={"checkbox"} name={'backCamera'} />
                    </label>
                    <label className="checkboxLabel">
                        Front Glass:
                        <input type={"checkbox"} name={'frontGlass'} />
                    </label>
                    <label className="checkboxLabel">
                        Back Glass:
                        <input type={"checkbox"} name={'backGlass'}/>
                    </label>
                    <label className="checkboxLabel">
                        LCD:
                        <input type={"checkbox"} name={'lcd'} />
                    </label>
                    <label className="checkboxLabel">
                        Network:
                        <input type={"checkbox"} name={'network'} />
                    </label>
                    <label className="checkboxLabel">
                        Charging Port:
                        <input type={"checkbox"} name={'chargingPort'} />
                    </label>
                    <label className="checkboxLabel">
                        Battery:
                        <input type={"checkbox"} name={'battery'} />
                    </label>
                    <label className="checkboxLabel">
                        Wireless Charging:
                        <input type={"checkbox"} name={'wirelessCharging'} />
                    </label>
                    <label className="checkboxLabel">
                        Finger Print:
                        <input type={"checkbox"} name={'fingerPrint'} />
                    </label>
                    <label className="checkboxLabel">
                        Face Id:
                        <input type={"checkbox"} name={'faceId'} />
                    </label>
                    <label className="checkboxLabel">
                        Speaker:
                        <input type={"checkbox"} name={"speaker"} />
                    </label>
                    <label className="checkboxLabel">
                        Microphone:
                        <input type={"checkbox"} name={"microphone"} />
                    </label>
                    <label className="checkboxLabel">
                        Screws:
                        <input type={"checkbox"} name={"screws"} />
                    </label>
                    <label>
                        Notes:
                        <input type={"text"} name={"notes"} />
                    </label>
                </fieldset>
                <input type={"submit"}/>
            </form>
            <div id="response"></div>
        </div>
    )
}