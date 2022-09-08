import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react";
export default function Customers () {
    const setCustomer = useOutletContext()[1];
    const API = process.env.REACT_APP_API_URI
    let [inputs,setInputs] = useState({})
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`${API}/customer`,{
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
            setCustomer({_id:data.insertedId})
        } else if(data.code===11000) {
            resDiv.innerHTML="Error: customer already exist"
            resDiv.setAttribute('class','notify-fail')
        } else {
            resDiv.innerHTML="Error: customer already exist"
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
        function handleCustomerSelect(e) {
            let value = e.target.value
            setCustomer({_id:value})
        }
        fetch(`${API}/customer`).then((res)=>res.json())
        .then((data)=>{
            if(data){
            const select = document.getElementById('last10Customers')
            select.addEventListener("change",handleCustomerSelect)
            data.forEach(customer => {
                let option = select.appendChild(document.createElement('option'))
                option.setAttribute('value',customer._id)
                option.innerHTML=customer.name
            });
            }
        })
    },[API,setCustomer])
    return (
        <div>
            create a customer: 
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label>
                    Name: {" "}
                    <input required type={"text"} name="name" />
                </label>
                <label>
                    E-mail: {" "}
                    <input required type={"email"} name="email" />
                </label>
                <label>
                    Phone Number: {" "}
                    <input required type={"tel"} name="phoneNumber" />
                </label>
                <input type={"submit"}/>
            </form>
            <div id="response"></div>

            select a customer:
            <form>
                <fieldset>
                <select size={'5'} id={'last10Customers'}>
                </select>
                </fieldset>
            </form>
        </div>
    )
}