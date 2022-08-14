import { useState } from "react"
export default function Customers () {
    let [inputs,setInputs] = useState({})
    let response
    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://${process.env.REACT_APP_API_URI}/customer`,{
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
        </div>
    )
}