import Userfront from "@userfront/react"
import { Link } from "react-router-dom"
export default function Greeting(){
    return(
      <div>
        <h2 className="greetings">Welcome, {Userfront.user.name}</h2>
        <a href="/dashboard"><img src="/siteLogo.svg"/></a>
      </div>
    )
}