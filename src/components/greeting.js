import Userfront from "@userfront/react"

export default function Greeting(){
    return(
            <h2 className="greetings">Welcome, {Userfront.user.name}</h2>
    )
}